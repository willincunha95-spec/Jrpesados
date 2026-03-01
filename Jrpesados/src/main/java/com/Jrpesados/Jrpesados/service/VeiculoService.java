package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.Veiculo;
import com.Jrpesados.Jrpesados.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Veiculo salvar(Veiculo veiculo) {
        // Regra de Negócio: Não permite cadastrar a mesma placa duas vezes
        if (veiculoRepository.findByPlaca(veiculo.getPlaca()).isPresent()) {
            throw new RuntimeException("Já existe um veículo cadastrado com esta placa!");
        }
        return veiculoRepository.save(veiculo);
    }

    public Veiculo buscarPorId(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));
    }
}