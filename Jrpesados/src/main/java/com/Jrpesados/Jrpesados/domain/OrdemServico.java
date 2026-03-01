package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_ordens_servico")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricaoProblema;
    private String observacoesMecanico;

    private LocalDateTime dataAbertura;
    private LocalDateTime dataConclusao;

    @Enumerated(EnumType.STRING)
    private StatusOS status; // Ex: ABERTA, EM_ANDAMENTO, FINALIZADA

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "mecanico_id")
    private User mecanico; // O usuário com Role MECANIC

    @ManyToMany
    @JoinTable(
            name = "tb_os_pecas",
            joinColumns = @JoinColumn(name = "os_id"),
            inverseJoinColumns = @JoinColumn(name = "peca_id")
    )
    private List<Peca> pecasUtilizadas;
}