package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.Financeiro;
import com.Jrpesados.Jrpesados.domain.TipoMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FinanceiroRepository extends JpaRepository<Financeiro, Long> {
    
    @Query("SELECT COALESCE(SUM(f.valor), 0) FROM Financeiro f WHERE f.tipo = :tipo")
    BigDecimal sumValorByTipo(@Param("tipo") TipoMovimentacao tipo);

    @Query("SELECT f FROM Financeiro f WHERE f.usuario.email = :email")
    List<Financeiro> findByUsuarioEmail(@Param("email") String email);
}
