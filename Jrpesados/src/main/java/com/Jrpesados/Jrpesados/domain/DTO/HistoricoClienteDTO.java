package com.Jrpesados.Jrpesados.domain.DTO;

import java.math.BigDecimal;

public record HistoricoClienteDTO(
        Long id,
        String data,
        String descricao,
        BigDecimal valor,
        String numeroNota,
        String linkNotaPdf
) {}