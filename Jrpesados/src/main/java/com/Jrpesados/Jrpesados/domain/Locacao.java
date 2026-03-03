package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_locacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Locacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private User cliente;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo; // Para transporte de carga

    @ManyToOne
    @JoinColumn(name = "equipamento_id")
    private Equipamento equipamento; // Para locação de máquinas

    private LocalDateTime dataInicio;
    private LocalDateTime dataDevolucaoPrevista;

    // ESTE É O CAMPO QUE ESTAVA FALTANDO (ERRO LINHA 53)
    private LocalDateTime dataDevolucaoEfetiva;

    @Enumerated(EnumType.STRING)
    private StatusLocacao status; // Ex: ATIVA, FINALIZADA, CANCELADA

    private Double valorTotal;
}