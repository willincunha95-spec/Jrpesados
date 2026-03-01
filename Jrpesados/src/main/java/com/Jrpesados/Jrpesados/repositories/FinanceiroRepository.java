package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.Financeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceiroRepository extends JpaRepository<Financeiro , Long> {

}
