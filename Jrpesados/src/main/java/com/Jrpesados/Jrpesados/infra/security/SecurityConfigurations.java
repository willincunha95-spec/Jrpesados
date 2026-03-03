package com.Jrpesados.Jrpesados.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // --- ROTAS PÚBLICAS (Site do Rhuan) ---
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/equipamentos/catalogo").permitAll()
                        .requestMatchers(HttpMethod.POST, "/trabalhe-conosco").permitAll()
                        .requestMatchers(HttpMethod.POST, "/leads/solicitar").permitAll()

                        // --- REGRAS DO ADMIN (Seu pai) ---
                        .requestMatchers(HttpMethod.POST, "/veiculos").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/veiculos/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/veiculos/admin/dashboard").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/trabalhe-conosco").hasRole("ADMIN")

                        // --- REGRAS DO CLIENTE (User Logado) ---
                        .requestMatchers(HttpMethod.GET, "/veiculos/meu-perfil").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/veiculos/meus-rastreios").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/orcamentos/gerar").hasRole("USER")

                        // Qualquer outra rota precisa estar logado
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}