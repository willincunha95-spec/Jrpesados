package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.Peca;
import com.Jrpesados.Jrpesados.repositories.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PecaService {

    @Autowired
    private PecaRepository pecaRepository;

    public List<Peca> listarTodas() {
        return pecaRepository.findAll();
    }

    @Transactional
    public Peca cadastrarPeca(Peca peca) {
        return pecaRepository.save(peca);
    }

    @Transactional
    public void baixarEstoque(Long pecaId, Integer quantidade) {
        Peca peca = pecaRepository.findById(pecaId)
                .orElseThrow(() -> new RuntimeException("Peça não encontrada!"));

        if (peca.getQuantidadeEstoque() < quantidade) {
            throw new RuntimeException("Estoque insuficiente para a peça: " + peca.getNome());
        }

        peca.setQuantidadeEstoque(peca.getQuantidadeEstoque() - quantidade);
        pecaRepository.save(peca);
    }
}