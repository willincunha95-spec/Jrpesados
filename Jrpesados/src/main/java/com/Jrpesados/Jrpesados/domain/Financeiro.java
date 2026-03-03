package com.Jrpesados.Jrpesados.domain;

import com.Jrpesados.Jrpesados.domain.User.User; // Import do seu usuário
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
    private LocalDateTime dataVencimento; // Adicione este campo

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario; // Adicione esta ligação para o filtro de e-mail funcionar
}