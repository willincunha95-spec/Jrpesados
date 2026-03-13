package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.Candidato;
import com.Jrpesados.Jrpesados.repositories.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trabalhe-conosco")
public class CandidatoController {

    @Autowired
    private CandidatoRepository repository;

    @Autowired
    private com.Jrpesados.Jrpesados.service.FileService fileService;

    @PostMapping(consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> enviarCurriculo(
            @RequestParam("nome") String nome,
            @RequestParam("email") String email,
            @RequestParam("telefone") String telefone,
            @RequestParam("cargoPretendido") String cargoPretendido,
            @RequestParam(value = "linkCurriculo", required = false) String linkCurriculo,
            @RequestParam(value = "arquivo", required = false) org.springframework.web.multipart.MultipartFile arquivo
    ) {
        try {
            Candidato candidato = new Candidato();
            candidato.setNome(nome);
            candidato.setEmail(email);
            candidato.setTelefone(telefone);
            candidato.setCargoPretendido(cargoPretendido);
            candidato.setLinkCurriculo(linkCurriculo);

            if (arquivo != null && !arquivo.isEmpty()) {
                String fileUrl = fileService.saveFile(arquivo);
                candidato.setLinkCurriculo(fileUrl); // Salva o link do arquivo upado
            }

            repository.save(candidato);
            return ResponseEntity.ok("Currículo recebido com sucesso! Entraremos em contato.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro ao processar currículo: " + e.getMessage());
        }
    }
    
    @PostMapping("/{id}/aprovar")
    public ResponseEntity<String> aprovarCandidato(@PathVariable Long id) {
        return repository.findById(id).map(candidato -> {
            candidato.setStatus("APROVADO");
            repository.save(candidato);
            
            // Simulação de envio de e-mail bonito no terminal
            System.out.println("=========================================");
            System.out.println("Enviando E-MAIL para: " + candidato.getEmail());
            System.out.println("Assunto: Você foi aprovado na JR Pesados!");
            System.out.println("Olá " + candidato.getNome() + ",");
            System.out.println("Temos o prazer de informar que seu perfil foi APROVADO para a vaga de " + candidato.getCargoPretendido() + "!");
            System.out.println("Nossa equipe de RH entrará em contato em breve para os próximos passos.");
            System.out.println("Bem-vindo(a) ao time!");
            System.out.println("=========================================");
            
            return ResponseEntity.ok("Candidato aprovado com sucesso! E-mail enviado.");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/rejeitar")
    public ResponseEntity<String> rejeitarCandidato(@PathVariable Long id) {
        return repository.findById(id).map(candidato -> {
            candidato.setStatus("REJEITADO");
            repository.save(candidato);
            return ResponseEntity.ok("Candidato rejeitado.");
        }).orElse(ResponseEntity.notFound().build());
    }

    // Só o seu pai (ADMIN) vai conseguir ver essa lista depois
    @GetMapping
    public ResponseEntity<List<Candidato>> listarCandidatos() {
        return ResponseEntity.ok(repository.findAll());
    }
}