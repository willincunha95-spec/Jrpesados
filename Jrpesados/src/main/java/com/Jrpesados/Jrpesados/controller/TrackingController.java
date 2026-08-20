package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.service.SsxTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    @Autowired
    private SsxTrackingService ssxTrackingService;



    @PostMapping("/sync")
    public ResponseEntity<?> syncTracking() {
        try {
            ssxTrackingService.syncPositions();
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Posições sincronizadas com sucesso!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erro ao sincronizar frota: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
