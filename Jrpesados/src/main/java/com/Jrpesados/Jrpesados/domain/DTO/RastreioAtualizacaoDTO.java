package com.Jrpesados.Jrpesados.domain.DTO;

public record RastreioAtualizacaoDTO(
        String placa,
        Double latitude,
        Double longitude,
        String key // Simple security token to authenticate the GPS provider
) {}
