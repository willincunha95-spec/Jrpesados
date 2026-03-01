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

import java.util.Collection;
import java.util.List;


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
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 4 , message = "Deve ter no mínimo 4 caracteres")
    private String password;


    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User(String email, String password , UserRole role){
        this.email = email;
        this.password = password;
        this.role = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Se for ADMIN, ele tem poder total (Admin, Mecânico e Cliente)
        if (this.role == UserRole.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_MECANIC"),
                    new SimpleGrantedAuthority("ROLE_CLIENT")
            );
        }
        // Se for MECANICO, ele tem permissões específicas da oficina
        else if (this.role == UserRole.MECANIC) {
            return List.of(new SimpleGrantedAuthority("ROLE_MECANIC"));
        }
        // Por padrão, qualquer outro usuário (ou cliente) tem apenas a role de CLIENT
        else {
            return List.of(new SimpleGrantedAuthority("ROLE_CLIENT"));
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
