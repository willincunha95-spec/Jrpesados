package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.RastreamentoDTO;
import com.Jrpesados.Jrpesados.domain.DTO.VeiculoRequestDTO;
import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.service.VeiculoService;
import com.Jrpesados.Jrpesados.service.FleetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;
    @Autowired
    private FleetService fleetService;

    @PostMapping
    public ResponseEntity cadastrar(@RequestBody VeiculoRequestDTO data) {
        Veiculo novoVeiculo = new Veiculo();
        novoVeiculo.setPlaca(data.placa());
        novoVeiculo.setModelo(data.modelo());
        novoVeiculo.setKmAtual(data.kmAtual());

        veiculoService.salvar(novoVeiculo);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/rastreamento")
    public ResponseEntity atualizarPosicao(@PathVariable Long id, @RequestBody RastreamentoDTO data) {
        fleetService.registrarPosicao(id, data.latitude(), data.longitude(), data.kmAtual());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listar() {
        return ResponseEntity.ok(veiculoService.listarTodos());
    }
}