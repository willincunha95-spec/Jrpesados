package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_candidatos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String telefone;
    private String cargoPretendido; 
    private String linkCurriculo; 
    
    // Status do candidato no processo seletivo
    private String status = "PENDENTE"; 
    
    @Column(name = "data_envio")
    private java.time.LocalDateTime dataEnvio = java.time.LocalDateTime.now();
}