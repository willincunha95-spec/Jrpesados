package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.EquipamentoRequestDTO;
import com.Jrpesados.Jrpesados.domain.Equipamento;
import com.Jrpesados.Jrpesados.domain.StatusEquipamento;
import com.Jrpesados.Jrpesados.repositories.EquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController {

    @Autowired
    private EquipamentoRepository repository;

    @PostMapping
    public ResponseEntity cadastrar(@RequestBody EquipamentoRequestDTO data) {
        Equipamento novoEquipamento = new Equipamento();
        novoEquipamento.setNome(data.nome());
        novoEquipamento.setMarca(data.marca());
        novoEquipamento.setValorDiaria(data.valorDiaria());
        // Por padrão, todo equipamento novo entra como DISPONIVEL
        novoEquipamento.setStatus(StatusEquipamento.DISPONIVEL);

        repository.save(novoEquipamento);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Equipamento>> listar() {
        return ResponseEntity.ok(repository.findAll());
    }
}