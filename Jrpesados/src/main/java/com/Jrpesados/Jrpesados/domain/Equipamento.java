package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tb_equipamentos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String marca;
    private String modelo;

    @Column(unique = true)
    private String numeroSerie;

    private BigDecimal valorDiaria;
    
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private StatusEquipamento status; // DISPONIVEL, LOCADO, MANUTENCAO
}