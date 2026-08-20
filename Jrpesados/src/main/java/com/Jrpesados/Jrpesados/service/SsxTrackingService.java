package com.Jrpesados.Jrpesados.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.Jrpesados.Jrpesados.domain.StatusEncomenda;
import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.net.URI;

@Service
public class SsxTrackingService {

    @Value("${ssx.api.baseUrl}")
    private String baseUrl;

    @Value("${ssx.api.login}")
    private String login;

    @Value("${ssx.api.password}")
    private String password;

    @Value("${ssx.api.hashAuth}")
    private String hashAuth;

    private String currentAccessToken;
    private LocalDateTime tokenExpiresAt;
    private LocalDateTime lastSyncTime;

    @Autowired
    private VeiculoRepository veiculoRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private synchronized String getAccessToken() {
        if (currentAccessToken != null && tokenExpiresAt != null && LocalDateTime.now().isBefore(tokenExpiresAt)) {
            return currentAccessToken;
        }

        try {
            URI uri = UriComponentsBuilder.fromUriString(baseUrl + "/Login")
                    .queryParam("Username", login)
                    .queryParam("Password", password)
                    .queryParam("HashAuth", hashAuth)
                    .build().toUri();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>("", headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(uri, entity, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                this.currentAccessToken = (String) body.get("AccessToken");
                this.tokenExpiresAt = LocalDateTime.now().plusHours(12);
                return this.currentAccessToken;
            } else {
                throw new RuntimeException("Falha no login SSX: " + response.getStatusCode().value());
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao autenticar no SSX: " + e.getMessage());
        }
    }

    public void syncPositions() {
        // Cooldown de 15 minutos para evitar erro 429
        if (lastSyncTime != null && lastSyncTime.plusMinutes(15).isAfter(LocalDateTime.now())) {
            java.time.Duration diff = java.time.Duration.between(LocalDateTime.now(), lastSyncTime.plusMinutes(15));
            long mins = diff.toMinutes();
            long secs = diff.minusMinutes(mins).getSeconds();
            throw new RuntimeException("Aguarde " + mins + "m " + secs + "s para sincronizar novamente (Limite de segurança da API).");
        }

        String token = getAccessToken();
        String url = baseUrl + "/v3/Tracking/PositionHistory/List";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String today = java.time.LocalDate.now().toString();
        String jsonFilter = "[\n" +
                "  {\n" +
                "    \"PropertyName\": \"EventDate\",\n" +
                "    \"Condition\": \"GreaterThan\",\n" +
                "\"Value\" : \"" + today + "\"\n" +
                "  }\n" +
                "]";
        
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonFilter, headers);

        try {
            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, List.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map<String, Object>> positions = response.getBody();
                
                List<Veiculo> veiculosLocais = veiculoRepository.findAll();
                Map<String, Veiculo> plateMap = new HashMap<>();
                for (Veiculo v : veiculosLocais) {
                    if (v.getPlaca() != null) {
                        plateMap.put(v.getPlaca().replaceAll("[^a-zA-Z0-9]", "").toUpperCase(), v);
                    }
                }

                for (Map<String, Object> pData : positions) {
                    String plateFromSsx = (String) pData.get("Plate");
                    if (plateFromSsx == null) {
                        String trackedUnit = (String) pData.get("TrackedUnit");
                        if (trackedUnit != null && trackedUnit.contains("-")) {
                            plateFromSsx = trackedUnit.split("-")[0].trim();
                        } else {
                            plateFromSsx = trackedUnit;
                        }
                    }
                    
                    if (plateFromSsx == null) continue;

                    Double latitude = pData.get("Latitude") instanceof Number ? ((Number) pData.get("Latitude")).doubleValue() : null;
                    Double longitude = pData.get("Longitude") instanceof Number ? ((Number) pData.get("Longitude")).doubleValue() : null;

                    if (latitude != null && longitude != null) {
                        String cleanedSsxPlate = plateFromSsx.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();
                        Veiculo v = plateMap.get(cleanedSsxPlate);
                        
                        if (v == null) {
                            v = new Veiculo();
                            v.setPlaca(plateFromSsx);
                            v.setModelo("Importado via SSX");
                            v.setStatusCarga(StatusEncomenda.AGUARDANDO_COLETA);
                            plateMap.put(cleanedSsxPlate, v);
                        }

                        v.setLatitude(latitude);
                        v.setLongitude(longitude);
                        v.setPrevisaoChegada(LocalDateTime.now().toString());
                        veiculoRepository.save(v);
                    }
                }
                // Atualiza o tempo da última sincronização com sucesso
                this.lastSyncTime = LocalDateTime.now();
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            if (e.getStatusCode().value() == 429) {
                // Se der 429, forçamos um cooldown maior
                this.lastSyncTime = LocalDateTime.now(); 
                throw new RuntimeException("Limite excedido na SSX. O sistema entrou em modo de espera por 15 minutos.");
            }
            throw new RuntimeException("Erro na API SSX: " + e.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Erro inesperado na sincronização: " + e.getMessage());
        }
    }

    /**
     * Sincronização automática a cada 20 minutos para garantir que o 
     * usuário ainda tenha margem para cliques manuais.
     */
    @Scheduled(fixedDelay = 1200000, initialDelay = 60000)
    public void scheduledSync() {
        System.out.println("=== SYSTEM: Iniciando sincronização automática SSX (20 min interval) ===");
        try {
            syncPositions();
        } catch (Exception e) {
            System.err.println("=== SYSTEM: Sync automático ignorado ou falhou: " + e.getMessage());
        }
    }
}
