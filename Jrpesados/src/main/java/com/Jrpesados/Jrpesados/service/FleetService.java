package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.PosicaoVeiculo;
import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.domain.ManutencaoPreventiva;
import com.Jrpesados.Jrpesados.repositories.PosicaoVeiculoRepository;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import com.Jrpesados.Jrpesados.repositories.ManutencaoPreventivaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FleetService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private PosicaoVeiculoRepository posicaoRepository;

    @Autowired
    private ManutencaoPreventivaRepository preventivaRepository;

    @Transactional
    public void registrarPosicao(Long veiculoId, Double lat, Double lon, Long kmAtualizado) {
        Veiculo veiculo = veiculoRepository.findById(veiculoId)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        // 1. Atualiza o KM atual do caminhão
        veiculo.setKmAtual(kmAtualizado);
        veiculoRepository.save(veiculo);

        // 2. Salva o histórico de rastreamento
        PosicaoVeiculo novaPosicao = new PosicaoVeiculo();
        novaPosicao.setVeiculo(veiculo);
        novaPosicao.setLatitude(lat);
        novaPosicao.setLongitude(lon);
        novaPosicao.setDataHora(LocalDateTime.now());
        posicaoRepository.save(novaPosicao);

        // 3. Verifica alertas de manutenção preventiva
        verificarAlertasManutencao(veiculo);
    }

    private void verificarAlertasManutencao(Veiculo veiculo) {
        List<ManutencaoPreventiva> proximas = preventivaRepository.findByVeiculoId(veiculo.getId());

        for (ManutencaoPreventiva mp : proximas) {
            // Se faltar menos de 500km para a revisão, podemos marcar como URGENTE
            if (mp.getKmRevisao() - veiculo.getKmAtual() <= 500) {
                System.out.println("ALERTA: Veículo " + veiculo.getPlaca() + " precisa de " + mp.getDescricao());
                // Futuramente aqui enviamos uma notificação para o front do Rhuan
            }
        }
    }
}