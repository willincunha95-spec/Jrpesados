package com.Jrpesados.Jrpesados.domain.DTO;

import java.math.BigDecimal;

public record OrcamentoRequestDTO(
        String nomeCliente,
        String servico, // Ex: "Transporte de Carga" ou "Aluguel de Máquina"
        String detalhes,
        Double pesoOuDias,
        BigDecimal valorEstimado
) {}