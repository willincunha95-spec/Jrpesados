package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.repositories.*;
import com.Jrpesados.Jrpesados.domain.StatusOS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private OrdemServicoRepository osRepository;
    @Autowired
    private LocacaoRepository locacaoRepository;
    @Autowired
    private PecaRepository pecaRepository;

    public Map<String, Object> buscarDadosResumo() {
        Map<String, Object> dados = new HashMap<>();

        // Estatísticas em tempo real para o Front-end
        dados.put("totalVeiculos", veiculoRepository.count());
        dados.put("ordensAbertas", osRepository.countByStatus(StatusOS.ABERTA));
        dados.put("locacoesAtivas", locacaoRepository.count()); // Simplificado para total
        dados.put("pecasAbaixoMinimo", pecaRepository.countByQuantidadeEstoqueLessThan(5));

        return dados;
    }
}