package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_financeiro")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Financeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private BigDecimal valor;
    private LocalDateTime dataMovimentacao;

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipo; // RECEITA, DESPESA
}