package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.ManutencaoPreventiva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ManutencaoPreventivaRepository extends JpaRepository<ManutencaoPreventiva, Long> {

    List<ManutencaoPreventiva> findByVeiculoId(Long veiculoId);
    List<ManutencaoPreventiva> findByStatus(String status);
}
