"use client"

import { Truck, ShieldCheck, Clock, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Truck,
    title: "Içamento e Remoção",
    description: "Munck e guindastes para grandes equipamentos",
  },
  {
    icon: ShieldCheck,
    title: "Seguro e Rastreado",
    description: "Operação com seguro e rastreamento 24h",
  },
  {
    icon: Clock,
    title: "24 Horas",
    description: "Atendimento e disponibilidade operacional",
  },
  {
    icon: MapPin,
    title: "Cobertura Nacional",
    description: "Atuamos em todo o território brasileiro",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute -right-32 -top-24 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-32 bottom-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-primary text-primary-foreground rounded">
              <span className="text-sm font-semibold">Transporte Pesado, Remoção Técnica e Içamento</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-balance text-center lg:text-left">
              Especialistas em{" "}
              <span className="text-primary">movimentação pesada</span> para obras e indústria
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
              Operações completas com estudo técnico, equipe qualificada e frota de Munck, guindastes,
              guinchos e empilhadeiras. Segurança, planejamento e pontualidade em cada projeto.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-semibold group">
                  Solicitar Cotação
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="#equipamentos" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-semibold bg-background/50 backdrop-blur-sm">
                  Ver Frota
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-display font-bold text-primary">16+</p>
                <p className="text-sm text-muted-foreground">anos de experiência</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">30+</p>
                <p className="text-sm text-muted-foreground">equipamentos na frota</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">segmentos atendidos</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 lg:mt-0 flex flex-col gap-4 items-center lg:items-end z-20">
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-background group relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src="/images/truck-rosa.jpg"
                  alt="Frota JR Pesados - Caminhão Rosa"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600/1a1a1a/ffaa00?text=truck-rosa.jpg"
                  }}
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-background group relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src="/images/frota1.jpg"
                  alt="Frota JR Pesados"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600/1a1a1a/ffaa00?text=frota1.jpg"
                  }}
                />
              </div>
            </div>

            <div className="w-full max-w-2xl aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border-4 border-background group relative">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src="/images/frota2.jpg"
                alt="Operação JR Pesados"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/1200x600/1a1a1a/ffaa00?text=frota2.jpg"
                }}
              />
            </div>

            {/* Badge movido para baixo das fotos para não sobrepor nada */}
            <div className="bg-card w-full max-w-2xl p-4 rounded-xl shadow-lg border border-border flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex flex-col items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground uppercase tracking-widest">Frota 100%</p>
                <p className="text-xs text-muted-foreground">Segurada & Rastreada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features banner below */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 lg:mt-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
