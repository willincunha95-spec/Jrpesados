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
        // authentication.getName() pega o e-mail do usuário logado via Token
        return ResponseEntity.ok(veiculoService.obterDadosPerfil(authentication.getName()));
    }

    /**
     * RASTREIO CLIENTE: Lista simplificada de posições para o mapa do cliente.
     * Esse é o método que estava com erro de nome (D maiúsculo).
     */
    @GetMapping("/meus-rastreios")
    public ResponseEntity<List<VeiculoRastreioDTO>> listarMeusRastreios(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(veiculoService.buscarRastreiosDoCliente(email));
    }

    /**
     * GPS MOTORISTA: Rota completa com instruções técnicas (Exclusivo Admin/Motorista).
     */
    @GetMapping("/{id}/rota-motorista")
    public ResponseEntity<RotaMotoristaDTO> verRotaMotorista(@PathVariable Long id) {
        return ResponseEntity.ok(veiculoService.obterRotaCompleta(id));
    }

    /**
     * DASHBOARD ADMIN: Resumo de métricas para o seu pai.
     */
    @GetMapping("/admin/dashboard")
    public ResponseEntity<DashboardAdminDTO> verDashboard() {
        return ResponseEntity.ok(veiculoService.obterMetricasDashboard());
    }

    /**
     * ATUALIZAR STATUS: Seu pai atualiza onde a carga está e quando chega.
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
    public ResponseEntity<Veiculo> cadastrar(@RequestBody Veiculo veiculo) {
        return ResponseEntity.ok(veiculoService.salvar(veiculo));
    }
}