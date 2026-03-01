package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tb_pecas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Peca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String fabricante;

    @Column(unique = true)
    private String sku; // Código único da peça (ex: FILTRO-AR-SCANIA)

    private BigDecimal precoVenda;

    private Integer quantidadeEstoque;

    private BigDecimal valorUnitario;
}