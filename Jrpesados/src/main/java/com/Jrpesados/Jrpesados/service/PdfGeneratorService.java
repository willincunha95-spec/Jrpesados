package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.DTO.OrcamentoRequestDTO;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class PdfGeneratorService {

    public void exportarOrcamento(HttpServletResponse response, OrcamentoRequestDTO dto) throws IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        // Fonte e Título
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);
        Paragraph title = new Paragraph("ORÇAMENTO - JR PESADOS", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" ")); // Linha em branco

        // Conteúdo
        document.add(new Paragraph("Cliente: " + dto.nomeCliente()));
        document.add(new Paragraph("Serviço solicitado: " + dto.servico()));
        document.add(new Paragraph("Detalhes: " + dto.detalhes()));
        document.add(new Paragraph("Quantidade/Peso: " + dto.pesoOuDias()));
        document.add(new Paragraph("Valor Estimado: R$ " + dto.valorEstimado()));

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Este orçamento tem validade de 7 dias."));

        document.close();
    }
}