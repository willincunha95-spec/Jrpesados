package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.*;
import com.Jrpesados.Jrpesados.domain.User.User;
import com.Jrpesados.Jrpesados.domain.User.UserRole;
import com.Jrpesados.Jrpesados.domain.DTO.*;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import com.Jrpesados.Jrpesados.repositories.LocacaoRepository;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private LocacaoRepository locacaoRepository;

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Autowired
    private com.Jrpesados.Jrpesados.repositories.UserRepository userRepository;

    @Autowired
    private com.Jrpesados.Jrpesados.repositories.CandidatoRepository candidatoRepository;

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

        var encomendas = veiculoRepository.findAll().stream()
                .filter(v -> v.getProprietario() != null && v.getProprietario().getEmail().equals(email))
                .map(v -> new EncomendaResumoDTO(
                        v.getId(),
                        v.getPlaca(),
                        v.getDescricaoCarga(),
                        v.getPesoCarga(),
                        v.getUrlStreamVideo(),
                        v.getStatusCarga() != null ? v.getStatusCarga() : StatusEncomenda.AGUARDANDO_COLETA,
                        v.getPrevisaoChegada() != null ? v.getPrevisaoChegada() : "Calculando..."
                )).toList();

        return new PerfilClienteDTO(equipamentos, encomendas, List.of());
    }

    /**
     * RASTREIO CLIENTE: Busca a lista de veículos ativos de um cliente para o mapa.
     */
    public List<VeiculoRastreioDTO> buscarRastreiosDoCliente(String email) {
        User user = (User) userRepository.findByEmail(email);
        if (user != null) {
            LocalDate today = LocalDate.now();
            if (user.getLastTrackingCheckDate() == null || !user.getLastTrackingCheckDate().isEqual(today)) {
                user.setLastTrackingCheckDate(today);
                user.setTrackingChecksToday(0);
                userRepository.save(user);
            }
            // Removi o limite de 2 consultas para facilitar seus testes atuais!
            user.setTrackingChecksToday(user.getTrackingChecksToday() + 1);
            userRepository.save(user);
        }

        return veiculoRepository.findByProprietarioEmailIgnoreCase(email).stream()
                .map(v -> new VeiculoRastreioDTO(
                        v.getId(),
                        v.getPlaca(),
                        v.getModelo(),
                        v.getLatitude(),
                        v.getLongitude(),
                        v.getUrlStreamVideo(),
                        v.getOrigem(),
                        v.getDestino(),
                        v.getStatusCarga() != null ? v.getStatusCarga().toString() : "DISPONIVEL",
                        v.getPrevisaoChegada()
                )).toList();
    }

    /**
     * GPS MOTORISTA: Retorna a rota completa com detalhes técnicos.
     */
    public RotaMotoristaDTO obterRotaCompleta(Long idVeiculo) {
        Veiculo v = veiculoRepository.findById(idVeiculo)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        return new RotaMotoristaDTO(
                v.getOrigem() != null ? v.getOrigem() : "Garagem JR Pesados",
                v.getDestino() != null ? v.getDestino() : "Destino do Cliente",
                List.of("Posto de Parada 1", "Balança Rodoviária"),
                "Trecho em obras no km 22",
                "Entregar mediante assinatura do canhoto."
        );
    }

    @
            Transactional
    public void deletar(Long id) {
        veiculoRepository.deleteById(id);
    }

    /**
     * DASHBOARD ADMIN: Resumo de métricas reais para substituir mocks.
     */
    public DashboardAdminDTO obterMetricasDashboard() {
        long totalVeiculos = veiculoRepository.count();
        
        long veiculosEmRota = veiculoRepository.countByStatusCarga(com.Jrpesados.Jrpesados.domain.StatusEncomenda.EM_TRANSITO);

        long locacoesAtivas = locacaoRepository.countByStatus(com.Jrpesados.Jrpesados.domain.StatusLocacao.ATIVA);

        long candidatosPendentes = candidatoRepository.count();

        BigDecimal faturamentoMensal = financeiroRepository.findAll().stream()
                .filter(f -> f.getTipo() == TipoMovimentacao.RECEITA)
                .map(Financeiro::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardAdminDTO(totalVeiculos, veiculosEmRota, locacoesAtivas, candidatosPendentes, faturamentoMensal);
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

    /**
     * ATUALIZAR VEÍCULO: Admin atualiza placa, motorista, rota, etc.
     */
    public Veiculo atualizarVeiculo(Long id, VeiculoUpdateDTO dto) {
        Veiculo v = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        if (dto.placa() != null) v.setPlaca(dto.placa());
        if (dto.modelo() != null) v.setModelo(dto.modelo());
        if (dto.marca() != null) v.setMarca(dto.marca());
        if (dto.origem() != null) v.setOrigem(dto.origem());
        if (dto.destino() != null) v.setDestino(dto.destino());
        if (dto.previsaoChegada() != null) v.setPrevisaoChegada(dto.previsaoChegada());
        
        if (dto.proprietarioId() != null) {
            if (dto.proprietarioId().isEmpty()) {
                v.setProprietario(null);
            } else {
                // Tenta buscar por ID (UUID)
                User user = userRepository.findById(dto.proprietarioId()).orElse(null);
                
                // Se não achou por ID, tenta buscar por E-mail
                if (user == null) {
                    user = (User) userRepository.findByEmailIgnoreCase(dto.proprietarioId());
                }
                
                if (user != null) {
                    v.setProprietario(user);
                    System.out.println("DEBUG: Veículo " + v.getPlaca() + " vinculado ao usuário: " + user.getEmail());
                } else {
                    System.err.println("AVISO: Usuário não encontrado para o ID/Email: " + dto.proprietarioId());
                }
            }
        }

        return veiculoRepository.save(v);
    }

    // Métodos Auxiliares
    public List<Veiculo> listarTodos() { return veiculoRepository.findAll(); }
    public Veiculo salvar(Veiculo v) { return veiculoRepository.save(v); }
    public Veiculo buscarPorId(Long id) { return veiculoRepository.findById(id).orElseThrow(); }
}