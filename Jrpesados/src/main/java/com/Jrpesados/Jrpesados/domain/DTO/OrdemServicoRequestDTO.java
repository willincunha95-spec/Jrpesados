package com.Jrpesados.Jrpesados.domain.DTO;

import java.util.List;
public record OrdemServicoRequestDTO(Long veiculoId, String descricao, List<Long> pecasIds) {}
