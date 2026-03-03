package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.OrcamentoRequestDTO;
import com.Jrpesados.Jrpesados.service.PdfGeneratorService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/orcamentos")
public class OrcamentoController {

    @Autowired
    private PdfGeneratorService pdfService;

    @PostMapping("/gerar")
    public void gerarOrcamento(@RequestBody OrcamentoRequestDTO dto, HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=orcamento_jrpesados.pdf";
        response.setHeader(headerKey, headerValue);

        pdfService.exportarOrcamento(response, dto);
    }
}