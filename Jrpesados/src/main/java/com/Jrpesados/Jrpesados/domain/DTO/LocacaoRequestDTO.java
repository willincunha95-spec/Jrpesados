package com.Jrpesados.Jrpesados.domain.DTO;

import java.time.LocalDateTime;
public record LocacaoRequestDTO(Long equipamentoId, String clienteId, LocalDateTime dataFimPrevista) {}
