package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.Peca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PecaRepository extends JpaRepository<Peca , Long> {
    Optional<Peca> findBySku(String sku);

    long countByQuantidadeEstoqueLessThan(int threshold);
}
