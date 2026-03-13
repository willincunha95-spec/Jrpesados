package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.Equipamento;
import com.Jrpesados.Jrpesados.repositories.EquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController {

    @Autowired
    private EquipamentoRepository repository;

    @Autowired
    private com.Jrpesados.Jrpesados.service.FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            String url = fileService.saveFile(file);
            return ResponseEntity.ok(url);
        } catch (java.io.IOException e) {
            System.err.println("Erro no upload: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro ao salvar arquivo: " + e.getMessage());
        }
    }

    /**
     * CATÁLOGO PÚBLICO: Qualquer pessoa pode ver as máquinas no site.
     * Esse é o endpoint que o Rhuan vai usar na aba "Locação".
     */
    @GetMapping("/catalogo")
    public ResponseEntity<List<Equipamento>> listarCatalogoPublico() {
        // Usando o repository direto para evitar erro de 'service' inexistente
        List<Equipamento> equipamentos = repository.findAll();
        return ResponseEntity.ok(equipamentos);
    }

    /**
     * ADMIN: Cadastro de novas máquinas (Guindastes, Empilhadeiras, etc).
     */
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Equipamento equipamento) {
        try {
            Equipamento novoEquipamento = repository.save(equipamento);
            return ResponseEntity.ok(novoEquipamento);
        } catch (Exception e) {
            System.err.println("Erro ao cadastrar equipamento: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar equipamento: " + e.getMessage());
        }
    }

    /**
     * ADMIN: Listagem interna de todos os itens.
     */
    @GetMapping
    public ResponseEntity<List<Equipamento>> listarTodos() {
        return ResponseEntity.ok(repository.findAll());
    }

    /**
     * ADMIN: Deletar ou atualizar equipamento.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}