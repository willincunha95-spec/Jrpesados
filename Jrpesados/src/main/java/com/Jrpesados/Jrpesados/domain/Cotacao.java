package com.Jrpesados.Jrpesados.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_cotacoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cotacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String empresa;
    private String telefone;
    private String tipoServico;
    
    @Column(columnDefinition = "TEXT")
    private String mensagem;
    
    private String status = "PENDENTE"; // Pode ser PENDENTE, RESPONDIDA
    
    @Column(name = "data_solicitacao")
    private LocalDateTime dataSolicitacao = LocalDateTime.now();
}
