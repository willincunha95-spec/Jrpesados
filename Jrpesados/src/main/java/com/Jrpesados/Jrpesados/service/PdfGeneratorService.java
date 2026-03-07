package com.Jrpesados.Jrpesados.service;

import com.Jrpesados.Jrpesados.domain.DTO.OrcamentoRequestDTO;
import com.Jrpesados.Jrpesados.domain.Financeiro;
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

    public void exportarNotaFiscal(HttpServletResponse response, Financeiro financeiro) throws IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        // Estilos
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font fontSubTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font fontNormal = FontFactory.getFont(FontFactory.HELVETICA, 10);

        // Cabeçalho da Empresa
        Paragraph header = new Paragraph("JR PESADOS - COMPROVANTE DE SERVIÇO", fontTitle);
        header.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(header);

        Paragraph address = new Paragraph("Cajamar - Rua José Marques Ribeiro, 480\nEmail: contato@jrpesados.com.br", fontNormal);
        address.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(address);

        document.add(new Paragraph(" ")); // Espaço
        document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
        document.add(new Paragraph(" "));

        // Dados da Transação
        document.add(new Paragraph("DADOS DA FATURA", fontSubTitle));
        document.add(new Paragraph("Fatura Nº: NF-" + financeiro.getId(), fontNormal));
        document.add(new Paragraph("Cliente: " + financeiro.getCliente(), fontNormal));
        document.add(new Paragraph("Tipo de Serviço: " + financeiro.getTipoServico(), fontNormal));
        document.add(new Paragraph("Valor: R$ " + financeiro.getValor(), fontNormal));
        document.add(new Paragraph("Data: " + financeiro.getDataMovimentacao(), fontNormal));
        document.add(new Paragraph("Status: " + financeiro.getStatus(), fontNormal));

        document.add(new Paragraph(" "));
        document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
        document.add(new Paragraph(" "));
        
        Paragraph footer = new Paragraph("Agradecemos a preferência!", fontSubTitle);
        footer.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(footer);

        document.close();
    }
}