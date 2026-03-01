package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_locacao")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Locacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataInicio;
    private LocalDateTime dataFimPrevista;
    private LocalDateTime dataDevolucaoEfetiva;
    private BigDecimal valorTotal;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private User cliente; // O cliente que está alugando

    @ManyToOne
    @JoinColumn(name = "equipamento_id")
    private Equipamento equipamento;

    @Enumerated(EnumType.STRING)
    private StatusLocacao status; // ATIVA, CONCLUIDA, CANCELADA
}