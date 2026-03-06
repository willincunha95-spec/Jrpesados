"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="JR Pesados"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h3 className="font-display font-bold text-foreground">JR Pesados</h3>
                <p className="text-xs text-muted-foreground">Transportes e Remoções</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Soluções completas em transportes pesados e locação de equipamentos. 
              Qualidade e segurança há mais de 15 anos.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#equipamentos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Equipamentos
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#cotacao" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Solicitar Cotação
                </a>
              </li>
              <li>
                <a href="#trabalhe-conosco" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">Transporte Pesado</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Locação de Munck</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Remoções Industriais</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Locação de Empilhadeiras</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Guindastes</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">(11) 95857-2567</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">jrpesadoslog@hotmail.com</p>
                  <p className="text-sm text-muted-foreground">jrpesados@jrpesados.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Rua José Marques Ribeiro, 480<br />
                  Guaturinho, Cajamar - SP
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Atendimento 24 horas<br />
                  7 dias por semana
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JR Pesados. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  )
}
