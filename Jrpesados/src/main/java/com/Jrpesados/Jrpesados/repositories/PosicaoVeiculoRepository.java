package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.PosicaoVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PosicaoVeiculoRepository extends JpaRepository<PosicaoVeiculo , Long> {

    List<PosicaoVeiculo> findByVeiculoIdOrderByDataHora(Long veiculoId);

}
