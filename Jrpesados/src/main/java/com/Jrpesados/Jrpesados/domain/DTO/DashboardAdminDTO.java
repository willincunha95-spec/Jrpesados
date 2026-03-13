package com.Jrpesados.Jrpesados.domain.DTO;

import java.math.BigDecimal;

public record DashboardAdminDTO(
        long totalVeiculos,
        long veiculosEmRota,
        long locacoesAtivas,
        long candidatosPendentes,
        BigDecimal faturamentoMensal
) {}