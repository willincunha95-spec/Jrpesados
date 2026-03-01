package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/financeiro")
public class FinanceiroController {

    @Autowired
    private FinanceiroRepository repository;

    @GetMapping("/extrato")
    public ResponseEntity<List<Financeiro>> listarExtrato() {
        // Retorna a lista de todas as entradas e saídas registradas
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> verSaldoTotal() {
        // Aqui você pode implementar uma lógica no Repository para somar tudo
        // Por enquanto, retorna o extrato completo
        return ResponseEntity.ok(BigDecimal.ZERO);
    }
}