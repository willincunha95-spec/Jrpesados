package com.Jrpesados.Jrpesados.domain.DTO;

import java.util.List;

public record PerfilClienteDTO(
        List<EquipamentoResumoDTO> equipamentos,
        List<EncomendaResumoDTO> encomendas,
        List<HistoricoClienteDTO> historico // Este terceiro campo é o "null" que passamos no service
) {}