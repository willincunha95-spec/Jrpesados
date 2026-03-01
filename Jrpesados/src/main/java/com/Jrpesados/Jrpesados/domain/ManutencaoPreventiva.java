package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.StatusPreventiva;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_manutencoes_preventivas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ManutencaoPreventiva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private Long kmRevisao; // KM em que a revisão deve ser feita
    private LocalDate dataSugestao;

    @Enumerated(EnumType.STRING)
    private StatusPreventiva status; // PENDENTE, CONCLUIDA

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;
}