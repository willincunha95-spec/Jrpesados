package com.Jrpesados.Jrpesados.domain.DTO;

import java.math.BigDecimal;

public record DashboardAdminDTO(
        long caminhoesEmViagem,
        long maquinasAlugadas,
        long totalClientes,
        BigDecimal faturamentoMensal
) {}