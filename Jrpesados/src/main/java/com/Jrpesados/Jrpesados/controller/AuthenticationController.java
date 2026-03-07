package com.Jrpesados.Jrpesados.controller;


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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    //Aqui o codigo vai receber por meio de um POST (/login) o login do usuário e sua senha,vai criptografala e
    //  o Spring vai  comparar com a senha salva no banco de dados
    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Valid AuthenticationDTO data){
        var userNamePassoword = new UsernamePasswordAuthenticationToken(data.email() , data.password());
        var auth = this.authenticationManager.authenticate(userNamePassoword);

        User user = (User) auth.getPrincipal();
        // Self-healing the admin account if it was somehow registered as CLIENT
        if ("admin@jrpesados.com".equals(user.getEmail()) && user.getRole() != UserRole.ADMIN) {
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
        }

        var token = tokenService.generateToken(user);
        return  ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        // 1. Verificamos se o e-mail já existe (usando o método do seu repository)
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        // 2. Criptografamos a senha
        String encryptedPassword = passwordEncoder.encode(data.password());

        // 3. Criamos o usuário (Atenção à ordem: E-mail, Senha Criptografada, Role)
        User newUser = new User(data.email(), encryptedPassword, UserRole.CLIENT);

        // 4. Salvamos no PostgreSQL do Docker
        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
    @PostMapping("/admin/register-staff")
    public ResponseEntity registerStaff(@RequestBody @Valid RegisterDTO data){
        if (this.userRepository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        // Aqui usamos a role vinda do DTO (MECANIC ou ADMIN)
        User newUser = new User(data.email(), encryptedPassword, data.role());

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    // Usando uma classe interna ou record local para o DTO do forgot-password 
    public record ForgotPasswordDTO(String email) {}

    @PostMapping("/forgot-password")
    public ResponseEntity forgotPassword(@RequestBody @Valid ForgotPasswordDTO data) {
        // Simulando envio de e-mail de recuperação
        if (this.userRepository.findByEmail(data.email()) == null) {
            // Retornamos OK mesmo se o email não existir por questões de segurança
            return ResponseEntity.ok().build();
        }
        
        // Aqui entraria a lógica real de gerar token de recuperação e enviar email
        return ResponseEntity.ok().build();
    }

}
