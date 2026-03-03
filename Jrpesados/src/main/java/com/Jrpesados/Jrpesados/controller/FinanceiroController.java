package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.HistoricoClienteDTO;
import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import com.Jrpesados.Jrpesados.service.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/financeiro")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    /**
     * ENDPOINT PARA O CLIENTE: "Minhas Notas e Pagamentos"
     * O Rhuan vai chamar isso para montar a tabela de histórico no perfil.
     */
    @GetMapping("/meu-historico")
    public ResponseEntity<List<HistoricoClienteDTO>> listarMeuHistorico(Authentication authentication) {
        // Pega o email do token de quem está logado
        String email = authentication.getName();
        List<HistoricoClienteDTO> historico = financeiroService.buscarHistoricoPorCliente(email);
        return ResponseEntity.ok(historico);
    }

    /**
     * GESTÃO (ADMIN): Registrar uma nova movimentação (Receita ou Despesa)
     */
    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestParam String descricao,
                                            @RequestParam BigDecimal valor,
                                            @RequestParam TipoMovimentacao tipo) {
        financeiroService.registrarMovimentacao(descricao, valor, tipo);
        return ResponseEntity.ok("Movimentação registrada com sucesso!");
    }

    /**
     * GESTÃO (ADMIN): Ver saldo total da empresa
     */
    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> verSaldo() {
        return ResponseEntity.ok(financeiroService.calcularSaldoTotal());
    }
}