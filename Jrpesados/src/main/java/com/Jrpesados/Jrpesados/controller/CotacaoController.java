package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.CotacaoRequestDTO;
import com.Jrpesados.Jrpesados.domain.Cotacao;
import com.Jrpesados.Jrpesados.repositories.CotacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leads")
public class CotacaoController {

    @Autowired
    private CotacaoRepository repository;

    @PostMapping("/solicitar")
    public ResponseEntity<String> receberInteresse(@RequestBody CotacaoRequestDTO dto) {
        Cotacao cotacao = new Cotacao();
        cotacao.setNome(dto.nome());
        cotacao.setEmpresa(dto.empresa());
        cotacao.setTelefone(dto.telefone());
        cotacao.setTipoServico(dto.tipoServico());
        cotacao.setMensagem(dto.mensagem());
        
        repository.save(cotacao);

        return ResponseEntity.ok("Sua solicitação foi enviada! Nossa equipe comercial ligará em breve.");
    }
    
    @GetMapping
    public ResponseEntity<List<Cotacao>> listarCotacoes() {
        return ResponseEntity.ok(repository.findAllByOrderByDataSolicitacaoDesc());
    }
}