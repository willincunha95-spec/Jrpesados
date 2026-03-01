package com.Jrpesados.Jrpesados.domain.DTO;

import java.math.BigDecimal;
public record PecaRequestDTO(String nome, Integer quantidadeEstoque, BigDecimal valorUnitario) {}