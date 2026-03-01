package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.OrdemServico;
import com.Jrpesados.Jrpesados.domain.StatusOS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
    Optional<OrdemServicoRepository> findByVeiculoId(Long veiculoId);

    List<OrdemServicoRepository> findByStatus(StatusOS status);
}
