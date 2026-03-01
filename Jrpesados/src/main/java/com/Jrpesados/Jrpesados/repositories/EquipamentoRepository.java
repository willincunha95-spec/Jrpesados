package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.Equipamento;
import com.Jrpesados.Jrpesados.domain.StatusEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {
    //buscar equipamentos por status(ex ; Listar apenas os DISPONIVEIS)
    List<Equipamento> findByStatus(StatusEquipamento status);

    //Busca pelo número de série para evitar duplicatas
    Optional<Equipamento> findByNumeroSerie(String numeroSerie);


}
