package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.DTO.*;
import com.Jrpesados.Jrpesados.domain.Locacao;
import com.Jrpesados.Jrpesados.domain.StatusLocacao;
import com.Jrpesados.Jrpesados.domain.StatusEncomenda;
import com.Jrpesados.Jrpesados.repositories.LocacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilClienteService {

    @Autowired
    private LocacaoRepository locacaoRepository;

    public PerfilClienteDTO obterDadosPerfil(String emailCliente) {
        // Busca as locações ativas do cliente
        List<Locacao> locacoes = locacaoRepository.findByClienteEmailAndStatus(emailCliente, StatusLocacao.ATIVA);

        // Mapeia para EquipamentoResumoDTO (Nome correto conforme sua aba lateral)
        var equipamentos = locacoes.stream()
                .filter(l -> l.getEquipamento() != null)
                .map(l -> new EquipamentoResumoDTO(
                        l.getEquipamento().getId(),
                        l.getEquipamento().getNome(),
                        l.getEquipamento().getMarca(),
                        l.getDataDevolucaoPrevista() != null ? l.getDataDevolucaoPrevista().toString() : "A combinar"
                )).toList();

        // Mapeia para EncomendaResumoDTO (Nome correto conforme sua aba lateral)
        var encomendas = locacoes.stream()
                .filter(l -> l.getVeiculo() != null)
                .map(l -> new EncomendaResumoDTO(
                        l.getVeiculo().getId(),
                        l.getVeiculo().getPlaca(),
                        l.getVeiculo().getDescricaoCarga(),
                        l.getVeiculo().getPesoCarga(),
                        l.getVeiculo().getUrlStreamVideo(),
                        l.getVeiculo().getStatusCarga() != null ? l.getVeiculo().getStatusCarga() : StatusEncomenda.AGUARDANDO_COLETA,
                        l.getVeiculo().getPrevisaoChegada() != null ? l.getVeiculo().getPrevisaoChegada() : "Calculando..."
                )).toList();

        // IMPORTANTE: Passamos List.of() no final para o Histórico não ficar nulo e dar erro no Record
        return new PerfilClienteDTO(equipamentos, encomendas, List.of());
    }
}