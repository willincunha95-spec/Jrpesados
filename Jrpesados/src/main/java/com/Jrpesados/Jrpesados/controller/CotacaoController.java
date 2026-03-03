package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.CotacaoRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leads")
public class CotacaoController {

    @PostMapping("/solicitar")
    public ResponseEntity<String> receberInteresse(@RequestBody CotacaoRequestDTO dto) {
        // Por enquanto, apenas printamos no console do seu IntelliJ
        System.out.println("Nova Cotação recebida de: " + dto.nome() + " para o serviço: " + dto.tipoServico());

        // Futuramente, aqui podemos disparar um e-mail automático para o seu pai
        return ResponseEntity.ok("Sua solicitação foi enviada! Nossa equipe comercial ligará em breve.");
    }
}