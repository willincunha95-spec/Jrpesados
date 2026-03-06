"use client"

import Image from "next/image"
import { Building2, Award, Users, Target } from "lucide-react"

const highlights = [
  {
    icon: Building2,
    title: "Fundação",
    value: "2010",
    description: "Início das operações",
  },
  {
    icon: Award,
    title: "Referência Nacional",
    value: "2022",
    description: "Expansão para todo o Brasil",
  },
  {
    icon: Users,
    title: "Equipe",
    value: "50+",
    description: "Profissionais qualificados",
  },
  {
    icon: Target,
    title: "Compromisso",
    value: "100%",
    description: "Excelência técnica",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Quem Somos</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight text-balance">
              Sobre a <span className="text-primary">JR Transportes</span> e Logística
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Fundada em 2010, a JR Transportes e Logística consolidou sua trajetória com 
                compromisso na inovação e excelência técnica. Desde 2022, somos referência 
                em todo o Brasil, dispondo de frota moderna e equipamentos especializados.
              </p>
              <p>
                Nossa missão é oferecer soluções completas em transporte pesado e locação 
                de equipamentos, garantindo segurança, qualidade e pontualidade em cada 
                operação. Contamos com uma equipe altamente qualificada e certificada, 
                pronta para atender às demandas mais complexas do mercado.
              </p>
            </div>

            {/* Stats inline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {highlights.map((item) => (
                <div key={item.title} className="text-center">
                  <p className="text-2xl font-display font-bold text-primary">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/frota-jr.jpg"
                alt="Frota JR Pesados - Caminhões e Equipamentos"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Referência Nacional</p>
                      <p className="text-sm text-muted-foreground">+15 anos de experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
