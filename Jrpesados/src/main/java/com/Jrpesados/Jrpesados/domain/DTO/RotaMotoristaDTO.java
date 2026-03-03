package com.Jrpesados.Jrpesados.domain.DTO;

import java.util.List;

public record RotaMotoristaDTO(
        String origem,
        String destino,
        List<String> pontosDeParada,
        String alertasTransito,
        String instrucoesEntrega // Detalhes que só o motorista vê
) {}