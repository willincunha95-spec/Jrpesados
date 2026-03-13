package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.LocacaoRequestDTO;
import com.Jrpesados.Jrpesados.domain.Locacao;
import com.Jrpesados.Jrpesados.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/locacoes")
public class LocacaoController {

    @Autowired
    private RentalService rentalService;

    @Autowired
    private com.Jrpesados.Jrpesados.repositories.UserRepository userRepository;

    @Autowired
    private com.Jrpesados.Jrpesados.repositories.EquipamentoRepository equipamentoRepository;

    @PostMapping("/abrir")
    public ResponseEntity<?> abrir(@RequestBody LocacaoRequestDTO data) {
        try {
            Locacao novaLocacao = new Locacao();
            
            var equipamento = equipamentoRepository.findById(data.equipamentoId())
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado"));
            
            var cliente = userRepository.findById(data.clienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

            novaLocacao.setEquipamento(equipamento);
            novaLocacao.setCliente(cliente);
            novaLocacao.setDataDevolucaoPrevista(data.dataFimPrevista());
            
            return ResponseEntity.ok(rentalService.abrirLocacao(novaLocacao));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}