package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.DTO.HistoricoClienteDTO;
import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import com.Jrpesados.Jrpesados.repositories.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Transactional
    public void registrarMovimentacao(com.Jrpesados.Jrpesados.domain.DTO.FinanceiroDTO dto) {
        Financeiro movimento = new Financeiro();
        movimento.setCliente(dto.cliente());
        movimento.setTipoServico(dto.tipoServico());
        movimento.setDescricao(dto.descricao());
        movimento.setValor(dto.valor());
        movimento.setTipo(dto.tipo());
        movimento.setStatus(dto.status());
        movimento.setDataMovimentacao(LocalDateTime.now());
        movimento.setDataVencimento(LocalDateTime.now());

        financeiroRepository.save(movimento);
    }

    public List<Financeiro> listarTudo() {
        return financeiroRepository.findAll();
    }

    public BigDecimal calcularSaldoTotal() {
        List<Financeiro> todos = financeiroRepository.findAll();
        BigDecimal entradas = todos.stream()
                .filter(f -> f.getTipo() == TipoMovimentacao.RECEITA)
                .map(Financeiro::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal saidas = todos.stream()
                .filter(f -> f.getTipo() == TipoMovimentacao.DESPESA)
                .map(Financeiro::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        return entradas.subtract(saidas);
    }

    // Este método agora compila sem erros
    public List<HistoricoClienteDTO> buscarHistoricoPorCliente(String email) {
        return financeiroRepository.findAll().stream()
                // Garante que o usuário e o e-mail não sejam nulos para evitar NullPointerException
                .filter(f -> f.getUsuario() != null && f.getUsuario().getEmail().equals(email))
                .map(f -> new HistoricoClienteDTO(
                        f.getId(),
                        f.getDataVencimento() != null ? f.getDataVencimento().toString() : "N/A",
                        f.getDescricao(),
                        f.getValor(),
                        "NF-" + f.getId(),
                        "http://jrpesados.com/notas/download/" + f.getId()
                )).toList();
    }

    @Transactional
    public void deletar(Long id) {
        financeiroRepository.deleteById(id);
    }
}