package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.RastreioAtualizacaoDTO;
import com.Jrpesados.Jrpesados.domain.StatusEncomenda;
import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/rastreio")
public class RastreioController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    private static final String GPS_SECRET_KEY = "jrpesados-gps-token-123";

    @PostMapping("/atualizar")
    public ResponseEntity<String> atualizarLocalizacao(@RequestBody RastreioAtualizacaoDTO dto) {
        if (!GPS_SECRET_KEY.equals(dto.key())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chave de segurança inválida.");
        }

        Optional<Veiculo> veiculoOpt = veiculoRepository.findByPlaca(dto.placa());

        if (veiculoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Veículo com placa " + dto.placa() + " não encontrado.");
        }

        Veiculo veiculo = veiculoOpt.get();
        
        // --- Inteligência de Status Automático ---
        // Se o caminhão ainda estava aguardando coleta e o rastreador mandou posição, ele já está em trânsito
        if (veiculo.getStatusCarga() == null || veiculo.getStatusCarga() == StatusEncomenda.AGUARDANDO_COLETA) {
            veiculo.setStatusCarga(StatusEncomenda.EM_TRANSITO);
        }
        
        // Verifica se o caminhão está em movimento (coordenadas mudaram minimamente)
        boolean emMovimento = veiculo.getLatitude() != null && veiculo.getLongitude() != null &&
                (Math.abs(veiculo.getLatitude() - dto.latitude()) > 0.0001 || 
                 Math.abs(veiculo.getLongitude() - dto.longitude()) > 0.0001);

        if (emMovimento && veiculo.getStatusCarga() != StatusEncomenda.ENTREGUE) {
             veiculo.setStatusCarga(StatusEncomenda.EM_TRANSITO);
        }

        veiculo.setLatitude(dto.latitude());
        veiculo.setLongitude(dto.longitude());

        veiculoRepository.save(veiculo);

        return ResponseEntity.ok("Localização atualizada com sucesso.");
    }
}
