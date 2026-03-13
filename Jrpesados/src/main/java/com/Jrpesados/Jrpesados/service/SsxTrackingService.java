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
                
                // SSX ExpiresIn returns .NET ticks (e.g., 639089419300265482)
                // Usar valor fixo de 12 horas para evitar erros de calc. no Java com ticks altos
                this.tokenExpiresAt = LocalDateTime.now().plusHours(12);
                
                return this.currentAccessToken;
            } else {
                throw new RuntimeException("Failed to login to SSX API: " + response.getStatusCode().value());
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            throw new RuntimeException("Error communicating with SSX API /Login: HTTP " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with SSX API /Login: " + e.getMessage(), e);
        }
    }

    public void syncPositions() {
        String token = getAccessToken();
        String url = baseUrl + "/v3/Tracking/PositionHistory/List";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Data dinâmica para o filtro (hoje)
        String today = java.time.LocalDate.now().toString();
        
        // Fetching latest positions for all tracked units. Using a dynamic date.
        String jsonFilter = "[\n" +
                "  {\n" +
                "    \"PropertyName\": \"EventDate\",\n" +
                "    \"Condition\": \"GreaterThan\",\n" +
                "\"Value\" : \"" + today + "\"\n" +
                "  }\n" +
                "]";
        
        System.out.println("Chamando SSX PositionHistory/List com filtro: " + jsonFilter);
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonFilter, headers);

        try {
            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, List.class);
            System.out.println("Resposta SSX PositionHistory: HTTP " + response.getStatusCode().value());

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map<String, Object>> positions = response.getBody();
                System.out.println("Sincronização SSX: " + positions.size() + " posições recebidas.");
                
                // Caching the vehicles locally in a Map for fast lookup
                List<Veiculo> veiculosLocais = veiculoRepository.findAll();
                Map<String, Veiculo> plateMap = new HashMap<>();
                for (Veiculo v : veiculosLocais) {
                    if (v.getPlaca() != null) {
                        plateMap.put(v.getPlaca().replaceAll("[^a-zA-Z0-9]", "").toUpperCase(), v);
                    }
                }

                int newVehiclesCount = 0;
                for (Map<String, Object> pData : positions) {
                    // SSX provides the actual plate in the 'Plate' field
                    String plateFromSsx = (String) pData.get("Plate");
                    
                    // Fallback to TrackedUnit if Plate is missing (cleaning it to get the plate part)
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
                            // AUTO-REGISTRATION: Create new vehicle if not found
                            v = new Veiculo();
                            v.setPlaca(plateFromSsx);
                            v.setModelo("Importado via SSX");
                            v.setStatusCarga(StatusEncomenda.AGUARDANDO_COLETA);
                            System.out.println("=== SYSTEM: Auto-cadastrando novo veículo: " + plateFromSsx);
                            newVehiclesCount++;
                            // Add to map so we don't create it again in the same loop
                            plateMap.put(cleanedSsxPlate, v);
                        }

                        v.setLatitude(latitude);
                        v.setLongitude(longitude);
                        v.setPrevisaoChegada(LocalDateTime.now().toString());
                        veiculoRepository.save(v);
                    }
                }
                if (newVehiclesCount > 0) {
                    System.out.println("=== SYSTEM: " + newVehiclesCount + " novos veículos foram auto-cadastrados.");
                }
            } else {
                throw new RuntimeException("Failed to sync positions: HTTP " + response.getStatusCode().value());
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("ERRO na API SSX: HTTP " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 429) {
                throw new RuntimeException("Limite de requisições excedido pela SSX (HTTP 429). Aguarde alguns minutos antes de tentar novamente.");
            }
            throw new RuntimeException("Erro ao sincronizar posições: HTTP " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("ERRO inesperado ao sincronizar posições: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao sincronizar posições SSX: " + e.getMessage(), e);
        }
    }

    public void syncVehicles() {
        // Desativado temporariamente para evitar erro 403 e economizar quota de requisições (429)
        /*
        String token = getAccessToken();
        ...
        */
        System.out.println("Sincronização de veículos ignorada (desativada).");
    }

    /**
     * Sincronização automática a cada 5 minutos (300.000ms).
     * O initialDelay de 60.000ms (1 minuto) evita que rode exatamente na hora que o app inicia.
     */
    @Scheduled(fixedDelay = 300000, initialDelay = 60000)
    public void scheduledSync() {
        System.out.println("=== SYSTEM: Iniciando sincronização automática SSX... ===");
        try {
            syncPositions();
            System.out.println("=== SYSTEM: Sincronização automática SSX concluída com sucesso. ===");
        } catch (Exception e) {
            System.err.println("=== SYSTEM: Falha na sincronização automática SSX: " + e.getMessage());
        }
    }
}
