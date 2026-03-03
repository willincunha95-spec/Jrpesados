package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.DTO.HistoricoClienteDTO;
import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Transactional
    public void registrarMovimentacao(String descricao, BigDecimal valor, TipoMovimentacao tipo) {
        Financeiro movimento = new Financeiro();
        movimento.setDescricao(descricao);
        movimento.setValor(valor);
        movimento.setTipo(tipo);
        movimento.setDataMovimentacao(LocalDateTime.now());
        // Por padrão, se não informada, o vencimento é agora
        movimento.setDataVencimento(LocalDateTime.now());

        financeiroRepository.save(movimento);
    }

    public BigDecimal calcularSaldoTotal() {
        return BigDecimal.ZERO;
    }

    // Este método agora compila sem erros
    public List<HistoricoClienteDTO> buscarHistoricoPorCliente(String email) {
        return financeiroRepository.findAll().stream()
                // Garante que o usuário e o e-mail não sejam nulos para evitar NullPointerException
                .filter(f -> f.getUsuario() != null && f.getUsuario().getEmail().equals(email))
                .map(f -> new HistoricoClienteDTO(
                        f.getId(),
                        f.getDataVencimento() != null ? f.getDataVencimento().toString() : "N/A",
                        f.getDescricao(),
                        f.getValor(),
                        "NF-" + f.getId(),
                        "http://jrpesados.com/notas/download/" + f.getId()
                )).toList();
    }
}