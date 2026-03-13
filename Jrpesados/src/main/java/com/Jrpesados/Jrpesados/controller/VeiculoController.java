package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.*;
import com.Jrpesados.Jrpesados.domain.StatusEncomenda;
import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    /**
     * PORTAL DO CLIENTE: Retorna equipamentos e encomendas ativas.
     */
    @GetMapping("/meu-perfil")
    public ResponseEntity<PerfilClienteDTO> verMeuPerfil(Authentication authentication) {
        return ResponseEntity.ok(veiculoService.obterDadosPerfil(authentication.getName()));
    }

    /**
     * RASTREIO CLIENTE: Lista simplificada de posições para o mapa do cliente.
     */
    @GetMapping("/meus-rastreios")
    public ResponseEntity<List<VeiculoRastreioDTO>> listarMeusRastreios(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(veiculoService.buscarRastreiosDoCliente(email));
    }

    /**
     * GPS MOTORISTA: Rota completa com instruções técnicas.
     */
    @GetMapping("/{id}/rota-motorista")
    public ResponseEntity<RotaMotoristaDTO> verRotaMotorista(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.obterRotaCompleta(id));
    }

    /**
     * DASHBOARD ADMIN: Resumo de métricas.
     */
    @GetMapping("/admin/dashboard")
    public ResponseEntity<DashboardAdminDTO> verDashboard() {
        return ResponseEntity.ok(veiculoService.obterMetricasDashboard());
    }

    /**
     * ATUALIZAR STATUS: Admin atualiza onde a carga está e quando chega.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> atualizarStatus(
            @PathVariable Long id,
            @RequestParam StatusEncomenda novoStatus,
            @RequestParam String previsao) {

        veiculoService.atualizarStatusCarga(id, novoStatus, previsao);
        return ResponseEntity.ok("Status da carga atualizado com sucesso!");
    }

    /**
     * CRUD BÁSICO: Listar todos os veículos (Admin).
     */
    @GetMapping
    public ResponseEntity<List<Veiculo>> listarTodos() {
        return ResponseEntity.ok(veiculoService.listarTodos());
    }

    /**
     * CRUD BÁSICO: Cadastrar novo veículo (Admin).
     */
    @PostMapping
    public ResponseEntity cadastrar(@RequestBody Veiculo veiculo) {
        try {
            return ResponseEntity.ok(veiculoService.salvar(veiculo));
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar veículo: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar veículo: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody VeiculoUpdateDTO data) {
        try {
            return ResponseEntity.ok(veiculoService.atualizarVeiculo(id, data));
        } catch (Exception e) {
            System.err.println("Erro ao atualizar veículo: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao atualizar veículo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        veiculoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}