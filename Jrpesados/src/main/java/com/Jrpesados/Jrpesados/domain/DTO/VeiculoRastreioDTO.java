package com.Jrpesados.Jrpesados.domain.DTO;

public record VeiculoRastreioDTO(
        Long id,
        String placa,
        String modelo,
        Double latitude,
        Double longitude,
        String urlStreamVideo,
        String origem,
        String destino,
        String statusCarga,
        String previsaoChegada
) {}