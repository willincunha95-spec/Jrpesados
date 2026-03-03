package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.*;
import com.Jrpesados.Jrpesados.domain.DTO.*;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import com.Jrpesados.Jrpesados.repositories.LocacaoRepository;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private LocacaoRepository locacaoRepository;

    @Autowired
    private FinanceiroRepository financeiroRepository;

    /**
     * PORTAL DO CLIENTE: Dados para a tela de perfil (Equipamentos e Encomendas).
     */
    public PerfilClienteDTO obterDadosPerfil(String email) {
        var locacoes = locacaoRepository.findAll().stream()
                .filter(l -> l.getCliente().getEmail().equals(email) && l.getStatus() == StatusLocacao.ATIVA)
                .toList();

        var equipamentos = locacoes.stream()
                .filter(l -> l.getEquipamento() != null)
                .map(l -> new EquipamentoResumoDTO(
                        l.getEquipamento().getId(),
                        l.getEquipamento().getNome(),
                        l.getEquipamento().getMarca(),
                        l.getDataDevolucaoPrevista() != null ? l.getDataDevolucaoPrevista().toString() : "A combinar"
                )).toList();

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

        return new PerfilClienteDTO(equipamentos, encomendas, List.of());
    }

    /**
     * RASTREIO CLIENTE: Busca a lista de veículos ativos de um cliente para o mapa.
     */
    public List<VeiculoRastreioDTO> buscarRastreiosDoCliente(String email) {
        return locacaoRepository.findAll().stream()
                .filter(l -> l.getCliente().getEmail().equals(email)
                        && l.getStatus() == StatusLocacao.ATIVA
                        && l.getVeiculo() != null)
                .map(l -> new VeiculoRastreioDTO(
                        l.getVeiculo().getId(),
                        l.getVeiculo().getPlaca(),
                        l.getVeiculo().getModelo(),
                        l.getVeiculo().getLatitude(),
                        l.getVeiculo().getLongitude(),
                        l.getVeiculo().getUrlStreamVideo()
                )).toList();
    }

    /**
     * GPS MOTORISTA: Retorna a rota completa com detalhes técnicos.
     */
    public RotaMotoristaDTO obterRotaCompleta(Long idVeiculo) {
        Veiculo v = veiculoRepository.findById(idVeiculo)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        return new RotaMotoristaDTO(
                "Garagem JR Pesados",
                "Destino do Cliente",
                List.of("Posto de Parada 1", "Balança Rodoviária"),
                "Trecho em obras no km 22",
                "Entregar mediante assinatura do canhoto."
        );
    }

    /**
     * DASHBOARD ADMIN: Resumo de métricas para a tela inicial do seu pai.
     */
    public DashboardAdminDTO obterMetricasDashboard() {
        long caminhoesRua = veiculoRepository.findAll().stream()
                .filter(v -> v.getStatusCarga() == StatusEncomenda.EM_TRANSITO).count();

        long maquinas = locacaoRepository.findAll().stream()
                .filter(l -> l.getEquipamento() != null && l.getStatus() == StatusLocacao.ATIVA).count();

        long clientes = locacaoRepository.findAll().stream()
                .filter(l -> l.getStatus() == StatusLocacao.ATIVA)
                .map(l -> l.getCliente().getId()).distinct().count();

        BigDecimal faturamento = financeiroRepository.findAll().stream()
                .filter(f -> f.getTipo() == TipoMovimentacao.RECEITA)
                .map(Financeiro::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardAdminDTO(caminhoesRua, maquinas, clientes, faturamento);
    }

    /**
     * ATUALIZAR STATUS: Salva a nova posição/status da carga.
     */
    public void atualizarStatusCarga(Long id, StatusEncomenda status, String previsao) {
        Veiculo v = veiculoRepository.findById(id).orElseThrow();
        v.setStatusCarga(status);
        v.setPrevisaoChegada(previsao);
        veiculoRepository.save(v);
    }

    // Métodos Auxiliares
    public List<Veiculo> listarTodos() { return veiculoRepository.findAll(); }
    public Veiculo salvar(Veiculo v) { return veiculoRepository.save(v); }
    public Veiculo buscarPorId(Long id) { return veiculoRepository.findById(id).orElseThrow(); }
}