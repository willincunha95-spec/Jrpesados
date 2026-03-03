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
    private String cargoPretendido; // Ex: Motorista, Mecânico, Operador de Guindaste
    private String linkCurriculo; // Aqui o Rhuan manda o link do PDF/Drive
}