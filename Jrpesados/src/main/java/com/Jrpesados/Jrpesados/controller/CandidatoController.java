package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.Candidato;
import com.Jrpesados.Jrpesados.repositories.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trabalhe-conosco")
public class CandidatoController {

    @Autowired
    private CandidatoRepository repository;

    @PostMapping
    public ResponseEntity<String> enviarCurriculo(@RequestBody Candidato candidato) {
        repository.save(candidato);
        return ResponseEntity.ok("Currículo recebido com sucesso! Entraremos em contato.");
    }

    // Só o seu pai (ADMIN) vai conseguir ver essa lista depois
    @GetMapping
    public ResponseEntity<List<Candidato>> listarCandidatos() {
        return ResponseEntity.ok(repository.findAll());
    }
}