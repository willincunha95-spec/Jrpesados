package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.Equipamento;
import com.Jrpesados.Jrpesados.domain.Locacao;
import com.Jrpesados.Jrpesados.domain.StatusEquipamento;
import com.Jrpesados.Jrpesados.domain.StatusLocacao;
import com.Jrpesados.Jrpesados.repositories.EquipamentoRepository;
import com.Jrpesados.Jrpesados.repositories.LocacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class RentalService {

    @Autowired
    private LocacaoRepository locacaoRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Transactional
    public Locacao abrirLocacao(Locacao locacao) {
        Equipamento eq = equipamentoRepository.findById(locacao.getEquipamento().getId())
                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado!"));

        // Regra de Negócio: Impedir locação de item ocupado ou em manutenção
        if (eq.getStatus() != StatusEquipamento.DISPONIVEL) {
            throw new RuntimeException("Este equipamento não está disponível para locação no momento.");
        }

        // Atualiza o status do equipamento para LOCADO
        eq.setStatus(StatusEquipamento.LOCADO);
        equipamentoRepository.save(eq);

        locacao.setStatus(StatusLocacao.ATIVA);
        locacao.setDataInicio(LocalDateTime.now());

        return locacaoRepository.save(locacao);
    }

    @Transactional
    public Locacao encerrarLocacao(Long locacaoId) {
        Locacao locacao = locacaoRepository.findById(locacaoId)
                .orElseThrow(() -> new RuntimeException("Locação não encontrada!"));

        Equipamento eq = locacao.getEquipamento();

        // Finaliza a locação e libera o equipamento
        locacao.setStatus(StatusLocacao.CONCLUIDA);
        locacao.setDataDevolucaoEfetiva(LocalDateTime.now());

        eq.setStatus(StatusEquipamento.DISPONIVEL);

        equipamentoRepository.save(eq);
        return locacaoRepository.save(locacao);
    }
}