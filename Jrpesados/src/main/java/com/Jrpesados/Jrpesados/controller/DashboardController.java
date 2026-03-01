package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/resumo")
    public ResponseEntity<Map<String, Object>> getResumo() {
        return ResponseEntity.ok(dashboardService.buscarDadosResumo());
    }
}