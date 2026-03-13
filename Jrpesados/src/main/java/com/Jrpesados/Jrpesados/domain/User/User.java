package com.Jrpesados.Jrpesados.domain.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table (name = "tb_usuarios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {


    //Authenticão dos usuários
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Email(message = "O E-mail é invalido")
    @NotBlank( message = "O E-mail é obrigatório!")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 4 , message = "Deve ter no mínimo 4 caracteres")
    private String password;


    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Integer trackingChecksToday = 0;
    private LocalDate lastTrackingCheckDate;

    private String resetToken;
    private LocalDateTime resetTokenExpiry;

    public User(String email, String password , UserRole role){
        this.email = email;
        this.password = password;
        this.role = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Se for ADMIN ou o e-mail mestre, ele tem poder total
        if (this.role == UserRole.ADMIN || (this.email != null && this.email.toLowerCase().startsWith("admin@jrpesados.com"))) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_MECANIC"),
                    new SimpleGrantedAuthority("ROLE_USER"),
                    new SimpleGrantedAuthority("ROLE_CLIENT")
            );
        }
        // Se for MECANICO, ele tem permissões específicas da oficina
        else if (this.role == UserRole.MECANIC) {
            return List.of(
                new SimpleGrantedAuthority("ROLE_MECANIC"),
                new SimpleGrantedAuthority("ROLE_USER")
            );
        }
        // Por padrão, qualquer outro usuário (ou cliente) tem a role de USER e CLIENT
        else {
            return List.of(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_CLIENT")
            );
        }
    }

        @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
