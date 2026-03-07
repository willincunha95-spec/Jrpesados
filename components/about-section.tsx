"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const highlights = [
  "Frota moderna e equipamentos especializados",
  "Equipe técnica altamente qualificada",
  "Atendimento personalizado 24 horas",
  "Cobertura em todo território nacional",
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/fleet.jpg"
                alt="Frota JR Transportes"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-accent text-accent-foreground p-6 lg:p-8 rounded-xl shadow-2xl">
              <p className="text-4xl lg:text-5xl font-bold">2010</p>
              <p className="text-sm lg:text-base mt-1 opacity-90">Ano de Fundação</p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-xl -z-10" />
          </div>

          {/* Content Side */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Sobre Nós</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground leading-tight">
                Nossa História
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Fundada em 2010, a <strong className="text-foreground">JR Transportes e Logística</strong> consolidou 
                sua trajetória com compromisso na inovação e excelência técnica.
              </p>
              <p>
                Desde 2022, somos referência em todo o Brasil, dispondo de frota moderna e 
                equipamentos especializados para atender às mais diversas demandas do mercado 
                de transportes pesados e remoções industriais.
              </p>
              <p>
                Nossa missão é oferecer soluções completas e personalizadas, garantindo 
                segurança, pontualidade e eficiência em cada operação realizada.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
