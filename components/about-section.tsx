"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"

const highlights = [
  "Frota moderna e equipamentos especializados",
  "Atendimento em todo o território nacional",
  "Equipe técnica altamente qualificada",
  "Compromisso com prazos e segurança",
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Text */}
          <div className="space-y-6">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Sobre Nós
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4 text-balance">
                Excelência em Transportes e Logística desde 2010
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Fundada em 2010, a JR Transportes e Logística consolidou sua trajetória com compromisso na inovação e excelência técnica. Desde 2022, somos referência em todo o Brasil, dispondo de frota moderna e equipamentos especializados.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Nossa missão é oferecer soluções completas em transporte pesado e locação de equipamentos, sempre priorizando a segurança, qualidade e satisfação dos nossos clientes.
            </p>

            <ul className="space-y-3 pt-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <Image
                src="/images/frota.jpg"
                alt="Frota JR Pesados"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative card overlay */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-4xl font-display font-bold">15+</p>
              <p className="text-sm opacity-90">Anos de Experiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
