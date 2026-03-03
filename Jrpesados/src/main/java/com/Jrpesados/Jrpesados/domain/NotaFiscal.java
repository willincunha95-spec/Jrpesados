package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_notas_fiscais")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class NotaFiscal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroNota;
    private String chaveAcesso;
    private String urlPdf; // Link para o cliente baixar
    private LocalDateTime dataEmissao;

    @OneToOne
    @JoinColumn(name = "financeiro_id")
    private Financeiro financeiro;
}