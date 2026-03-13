package com.Jrpesados.Jrpesados.infra.security;

import com.Jrpesados.Jrpesados.domain.User.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;
//Gerador de token para usuarios que se registraram e estão fazendo login
    public String generateToken(User user){
       try{

           Algorithm  algorithm = Algorithm.HMAC256(secret);
           String roleName = user.getRole().toString();
           System.out.println("Gerando token para: " + user.getEmail() + " com role: " + roleName);
           String token = JWT.create()
                   .withIssuer("auth-api")
                   .withSubject(user.getEmail())
                   .withClaim("role", roleName)
                   .withExpiresAt(generateExperationData())
                   .sign(algorithm);
           return  token;
           //Gerando uma execeção para facilitar a localização de algum erro na aplicação
       } catch (JWTCreationException exception){
           throw new RuntimeException("Error ao gerar token", exception);

       }
    }
    public  String validateToken(String token){
        try{
            Algorithm  algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();

        }catch (com.auth0.jwt.exceptions.JWTVerificationException exception){
            System.out.println("Erro na verificacao do token JWT: " + exception.getMessage());
            return "";
        }
    }
    private Instant generateExperationData(){
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.ofHours(-3));
    }
}
