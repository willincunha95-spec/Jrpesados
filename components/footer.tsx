"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"

const quickLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cotacao", label: "Cotação" },
  { href: "#trabalhe-conosco", label: "Carreiras" },
]

const services = [
  "Transporte Pesado",
  "Locação de Munck",
  "Remoções Industriais",
  "Locação de Empilhadeiras",
  "Guindastes",
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="JR Pesados"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-display text-lg text-background">JR Pesados</h3>
                <p className="text-xs text-background/50 uppercase tracking-wider">Transportes</p>
              </div>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Soluções completas em transportes pesados e locação de equipamentos. Qualidade e segurança há mais de 25 anos.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-medium text-background/40 uppercase tracking-widest mb-6">
              Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-background/70 hover:text-background transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
              <li>
                <Link 
                  href="/login" 
                  className="text-sm text-background/70 hover:text-background transition-colors inline-flex items-center gap-1 group"
                >
                  Área do Cliente
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-background/40 uppercase tracking-widest mb-6">
              Serviços
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-background/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-background/40 uppercase tracking-widest mb-6">
              Contato
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm text-background/70">
                  <p>(11) 95857-2567</p>
                  <p>(11) 3333-3333</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background/70">contato@jrpesados.com.br</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background/70">
                  Av. Industrial, 1234<br />
                  São Paulo - SP
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} JR Pesados. Todos os direitos reservados.
            </p>
            <p className="text-xs text-background/40">
              Atendimento 24 horas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
