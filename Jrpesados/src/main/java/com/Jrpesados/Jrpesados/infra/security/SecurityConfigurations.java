package com.Jrpesados.Jrpesados.infra.security;


import com.Jrpesados.Jrpesados.service.AutorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations  {
    @Autowired
    SecurityFilter securityFilter;
    @Autowired
    private AutorizationService autorizationService;

    @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){


//Configurações para desabalitar funções do SpringSecurity
        //e outras para ter controle da authenticação do usuário(se ele é ADMIN ou CLIENT)
        // e suas permissões de uso para cada sessão /Encomenda, atualizarStatus etc.
       return httpSecurity
               .csrf(csrf -> csrf.disable())
               .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authorizeHttpRequests(autorize -> autorize
                       .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                       .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                       .requestMatchers(HttpMethod.POST, "/Encomenda").hasRole("ADMIN")
                       .anyRequest().authenticated()

               )
               .addFilterBefore(securityFilter , UsernamePasswordAuthenticationFilter.class)
               .build();
   }


    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        // Forçamos o Spring a usar EXATAMENTE o Bean de PasswordEncoder que você criou
        authenticationManagerBuilder
                .userDetailsService(autorizationService)
                .passwordEncoder(passwordEncoder()); // <--- Aqui está o segredo!

        return authenticationManagerBuilder.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
