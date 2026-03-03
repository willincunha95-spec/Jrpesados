package com.Jrpesados.Jrpesados.domain.DTO;

public record CotacaoRequestDTO(
        String nome,
        String empresa,
        String telefone,
        String tipoServico, // Ex: Locação ou Transporte
        String mensagem
) {}