package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.OrdemServico;
import com.Jrpesados.Jrpesados.domain.Peca;
import com.Jrpesados.Jrpesados.domain.StatusOS;
import com.Jrpesados.Jrpesados.repositories.OrdemServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository osRepository;

    @Autowired
    private PecaService pecaService;

    @Transactional
    public OrdemServico finalizarOS(Long osId) {
        OrdemServico os = (OrdemServico) osRepository.findById(osId)
                .orElseThrow(() -> new RuntimeException("Ordem de Serviço não encontrada!"));

        if (os.getStatus() == StatusOS.CONCLUIDA) {
            throw new RuntimeException("Esta OS já foi finalizada!");
        }

        // Regra de Negócio: Baixar cada peça utilizada do estoque
        for (Peca peca : os.getPecasUtilizadas()) {
            // Aqui assumimos 1 unidade por peça na lista,
            // mas futuramente podemos ajustar para quantidades variáveis
            pecaService.baixarEstoque(peca.getId(), 1);
        }

        os.setStatus(StatusOS.CONCLUIDA);
        os.setDataConclusao(LocalDateTime.now());

        return osRepository.save(os);
    }
}