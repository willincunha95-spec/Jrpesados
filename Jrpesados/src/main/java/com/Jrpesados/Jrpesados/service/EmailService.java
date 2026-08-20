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
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("jrpesadosemail749@gmail.com");
            message.setTo(to);
            message.setSubject("Recuperação de Senha - JR Pesados");
            message.setText("Olá,\n\nVocê solicitou a recuperação de senha. Utilize o código de verificação abaixo para redefinir sua senha:\n\n" 
                           + token + "\n\nEste código expira em 1 hora.\n\nAtenciosamente,\nEquipe JR Pesados.");
            
            mailSender.send(message);
            System.out.println("E-mail de recuperação enviado com sucesso para: " + to);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());
        }
    }

    public void enviarEmailVerificacao(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("jrpesadosemail749@gmail.com");
            message.setTo(to);
            message.setSubject("Verificação de E-mail - JR Pesados");
            message.setText("Olá,\n\nObrigado por se cadastrar na JR Pesados! Para ativar sua conta, utilize o código de verificação abaixo:\n\n" 
                           + token + "\n\nAtenciosamente,\nEquipe JR Pesados.");
            
            mailSender.send(message);
            System.out.println("E-mail de ativação enviado com sucesso para: " + to);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail de verificação: " + e.getMessage());
        }
    }
}
