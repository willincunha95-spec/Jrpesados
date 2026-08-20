package com.Jrpesados.Jrpesados.controller;

import java.time.LocalDateTime;
import java.util.UUID;


import com.Jrpesados.Jrpesados.domain.DTO.AuthenticationDTO;
import com.Jrpesados.Jrpesados.domain.DTO.RegisterDTO;
import com.Jrpesados.Jrpesados.domain.User.User;
import com.Jrpesados.Jrpesados.domain.User.UserRole;
import com.Jrpesados.Jrpesados.infra.security.TokenService;
import com.Jrpesados.Jrpesados.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
//Toda vez que houver uma authenticação o string vai levar para o auth
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private com.Jrpesados.Jrpesados.service.EmailService emailService;

    //Aqui o codigo vai receber por meio de um POST (/login) o login do usuário e sua senha,vai criptografala e
    //  o Spring vai  comparar com a senha salva no banco de dados
    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Valid AuthenticationDTO data){
        try {
            var userNamePassoword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(userNamePassoword);

            User user = (User) auth.getPrincipal();
            // Self-healing the admin account
            if (user.getEmail() != null && user.getEmail().toLowerCase().startsWith("admin@jrpesados.com") && user.getRole() != UserRole.ADMIN) {
                user.setRole(UserRole.ADMIN);
                userRepository.save(user);
            }

            var token = tokenService.generateToken(user);
            return ResponseEntity.ok(token);
        } catch (org.springframework.security.authentication.DisabledException e) {
            return ResponseEntity.status(403).body("Por favor, verifique sua conta no e-mail recebido antes de fazer login.");
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            return ResponseEntity.status(401).body("E-mail ou senha incorretos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao realizar login: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        // 1. Verificamos se o e-mail já existe
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }

        // 2. Criptografamos a senha
        String encryptedPassword = passwordEncoder.encode(data.password());

        // 3. Criamos o usuário e geramos token de verificação
        User newUser = new User(data.email(), encryptedPassword, UserRole.CLIENT);
        String verificationToken = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        newUser.setVerificationToken(verificationToken);
        newUser.setEmailVerified(false); // Agora exigimos verificação

        // 4. Salvamos
        this.userRepository.save(newUser);

        // 5. Enviamos e-mail de verificação
        try {
            emailService.enviarEmailVerificacao(data.email(), verificationToken);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail de verificação: " + e.getMessage());
        }

        return ResponseEntity.ok("Usuário registrado! Verifique seu e-mail para ativar a conta.");
    }

    @PostMapping("/admin/register-staff")
    public ResponseEntity registerStaff(@RequestBody @Valid RegisterDTO data){
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.email(), encryptedPassword, data.role());
        newUser.setEmailVerified(true); // Staff já nasce verificado (ou admin ativa)

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-account")
    public ResponseEntity verifyAccount(@RequestParam String email, @RequestParam String token) {
        User user = (User) userRepository.findByEmail(email);
        if (user == null || user.getVerificationToken() == null || !user.getVerificationToken().equals(token)) {
            return ResponseEntity.badRequest().body("Código de verificação inválido.");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        return ResponseEntity.ok("Conta verificada com sucesso!");
    }

    // ... (rest of the code omitted for replacement boundaries)

    // Usando uma classe interna ou record local para o DTO do forgot-password 
    public record ForgotPasswordDTO(String email) {}

    @PostMapping("/forgot-password")
    public ResponseEntity forgotPassword(@RequestBody @Valid ForgotPasswordDTO data) {
        User user = (User) this.userRepository.findByEmail(data.email());
        if (user == null) {
            return ResponseEntity.ok().build();
        }
        
        // Gera um token de 8 caracteres
        String token = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        // Envia o e-mail real
        try {
            emailService.enviarEmailRecuperacao(data.email(), token);
            System.out.println("DEBUG: E-mail de recuperação enviado para " + data.email());
        } catch (Exception e) {
            System.err.println("ERRO ao enviar e-mail: " + e.getMessage());
            // Mesmo se falhar o e-mail, não interrompemos para não dar pista a hackers
        }
        
        return ResponseEntity.ok().build();
    }

    public record ResetPasswordDTO(String email, String token, String newPassword) {}

    @PostMapping("/reset-password")
    public ResponseEntity resetPassword(@RequestBody @Valid ResetPasswordDTO data) {
        User user = (User) userRepository.findByEmail(data.email());
        if (user == null || user.getResetToken() == null || !user.getResetToken().equals(data.token())) {
            return ResponseEntity.badRequest().body("Token inválido ou expirado.");
        }

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expirado.");
        }

        user.setPassword(passwordEncoder.encode(data.newPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

}
