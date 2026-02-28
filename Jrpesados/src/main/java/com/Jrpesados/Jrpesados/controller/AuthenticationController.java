package com.Jrpesados.Jrpesados.controller;


import com.Jrpesados.Jrpesados.domain.DTO.AuthenticationDTO;
import com.Jrpesados.Jrpesados.domain.DTO.RegisterDTO;
import com.Jrpesados.Jrpesados.domain.User;
import com.Jrpesados.Jrpesados.domain.UserRole;
import com.Jrpesados.Jrpesados.infra.security.TokenService;
import com.Jrpesados.Jrpesados.repositories.UserRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

        var token = tokenService.generateToken((User) auth.getPrincipal());
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
        User newUser = new User(data.email(), encryptedPassword, UserRole.CLIENT());

        // 4. Salvamos no PostgreSQL do Docker
        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
    @PostMapping("/admin/register-staff")
    public ResponseEntity registerStaff(@RequestBody @Valid RegisterDTO data){
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(),encryptedPassword, data.role());


    }

}
