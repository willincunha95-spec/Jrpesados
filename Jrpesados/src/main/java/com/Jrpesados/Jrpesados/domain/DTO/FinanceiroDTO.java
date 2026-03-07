package com.Jrpesados.Jrpesados.domain.DTO;

import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import java.math.BigDecimal;

public record FinanceiroDTO(
    String cliente,
    String tipoServico,
    String descricao,
    BigDecimal valor,
    TipoMovimentacao tipo,
    String status
) {}
