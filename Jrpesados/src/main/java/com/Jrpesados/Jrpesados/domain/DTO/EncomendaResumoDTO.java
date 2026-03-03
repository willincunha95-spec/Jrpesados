package com.Jrpesados.Jrpesados.domain.DTO;

import com.Jrpesados.Jrpesados.domain.StatusEncomenda;

public record EncomendaResumoDTO(
        Long idVeiculo,
        String placa,
        String descricaoCarga,
        Double peso,
        String urlVideo,
        StatusEncomenda status,     // <-- NOVO
        String previsaoChegada       // <-- NOVO
) {}