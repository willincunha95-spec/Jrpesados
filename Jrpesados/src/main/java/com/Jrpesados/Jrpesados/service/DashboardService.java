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
        dados.put("ordensAbertas", osRepository.findByStatus(StatusOS.ABERTA).size());
        dados.put("locacoesAtivas", locacaoRepository.findAll().size()); // Filtraremos por status ativa depois
        dados.put("pecasAbaixoMinimo", pecaRepository.findAll().stream()
                .filter(p -> p.getQuantidadeEstoque() < 5).count());

        return dados;
    }
}