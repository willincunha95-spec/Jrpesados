package com.Jrpesados.Jrpesados.domain.DTO;

public record VeiculoRastreioDTO(
        Long id,
        String placa,
        String modelo,
        Double latitude,
        Double longitude,
        String urlStreamVideo
) {}