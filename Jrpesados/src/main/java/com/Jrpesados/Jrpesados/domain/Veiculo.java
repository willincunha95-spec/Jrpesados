package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name  = "tb_veiculos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String placa;

    private String modelo;
    private String marca;
    private Integer ano;
    private Long kmAtual;

    private Double latitude;
    private Double longitude;
    private String urlStreamVideo;
    private String descricaoCarga;
    private String tamanhoCarga;
    private Double pesoCarga;

    @Enumerated(EnumType.STRING)
    private StatusEncomenda statusCarga;

    private String previsaoChegada; // Ex: "Hoje às 16:00" ou "05/03"

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User proprietario;
}