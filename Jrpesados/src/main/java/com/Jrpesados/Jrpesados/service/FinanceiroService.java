package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

        financeiroRepository.save(movimento);
    }

    public BigDecimal calcularSaldoTotal() {
        // Futuramente aqui somamos Receitas - Despesas
        return BigDecimal.ZERO;
    }
}