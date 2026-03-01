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

    @PostMapping("/abrir")
    public ResponseEntity abrir(@RequestBody LocacaoRequestDTO data) {
        Locacao novaLocacao = new Locacao();
        // Aqui o Service busca o equipamento pelo ID que veio no DTO
        // Mas para simplificar o Controller, passamos o DTO ou montamos o objeto básico
        return ResponseEntity.ok(rentalService.abrirLocacao(novaLocacao));
    }
}