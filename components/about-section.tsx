"use client"

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
    <section id="sobre" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Quem Somos</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
              Sobre a <span className="text-primary">JR Transportes</span> e Logística
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
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
          </div>

          {/* Right content - Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-display font-bold text-primary mb-1">{item.value}</p>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
