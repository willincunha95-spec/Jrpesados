package com.Jrpesados.Jrpesados.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    public String healthCheck() {
        return "API JR Pesados Online - Conexão estabelecida com sucesso! O sistema está pronto para receber o front-end.";
    }

    @GetMapping("/home")
    public String healthCheckHome() {
        return "API JR Pesados Online - Rota /home liberada com sucesso!";
    }
}
