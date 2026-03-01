package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.PecaRequestDTO;
import com.Jrpesados.Jrpesados.domain.OrdemServico;
import com.Jrpesados.Jrpesados.domain.Peca;
import com.Jrpesados.Jrpesados.service.OrdemServicoService;
import com.Jrpesados.Jrpesados.service.PecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oficina")
public class OficinaController {

    @Autowired
    private PecaService pecaService;
    @Autowired
    private OrdemServicoService osService;

    @PostMapping("/pecas")
    public ResponseEntity cadastrarPeca(@RequestBody PecaRequestDTO data) {
        Peca peca = new Peca();
        peca.setNome(data.nome());
        peca.setQuantidadeEstoque(data.quantidadeEstoque());
        peca.setValorUnitario(data.valorUnitario());

        pecaService.cadastrarPeca(peca);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/os/{id}/finalizar")
    public ResponseEntity finalizarOS(@PathVariable Long id) {
        return ResponseEntity.ok(osService.finalizarOS(id));
    }
}