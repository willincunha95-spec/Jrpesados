package com.Jrpesados.Jrpesados.domain.DTO;

public record VeiculoUpdateDTO(
    String placa,
    String modelo,
    String marca,
    String proprietarioId,
    String origem,
    String destino,
    String previsaoChegada
) {}
