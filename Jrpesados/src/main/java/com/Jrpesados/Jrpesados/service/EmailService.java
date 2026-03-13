package com.Jrpesados.Jrpesados.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailRecuperacao(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("contato@jrpesados.com.br");
        message.setTo(to);
        message.setSubject("Recuperação de Senha - JR Pesados");
        message.setText("Olá,\n\nVocê solicitou a recuperação de senha. Utilize o código abaixo para redefinir sua senha:\n\n" 
                       + token + "\n\nEste código expira em 1 hora.\n\nAtenciosamente,\nEquipe JR Pesados.");
        
        mailSender.send(message);
    }
}
