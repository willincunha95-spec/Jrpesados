package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo , Long> {
    //Busca pela placa do veiculo
    Optional<Veiculo> findByPlaca(String placa);


    // Lista de todos os veiculos de um dono
    java.util.List<Veiculo> findByProprietarioId(String proprietarioId);

    java.util.List<Veiculo> findByProprietarioEmail(String email);

    long countByStatusCarga(com.Jrpesados.Jrpesados.domain.StatusEncomenda status);
}
