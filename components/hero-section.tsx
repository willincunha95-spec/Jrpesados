"use client"

import { Truck, Shield, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Truck,
    title: "Frota Moderna",
    description: "Caminhões Munck e equipamentos de última geração",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Rastreamento em tempo real de todas as cargas",
  },
  {
    icon: Clock,
    title: "24 Horas",
    description: "Atendimento e suporte disponível a qualquer momento",
  },
  {
    icon: MapPin,
    title: "Cobertura Nacional",
    description: "Atuamos em todo o território brasileiro",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Líderes em Transportes Pesados</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-balance">
              Soluções em{" "}
              <span className="text-primary">Transportes</span> e{" "}
              <span className="text-primary">Locação</span> de Equipamentos
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Há mais de 15 anos oferecendo serviços de transporte pesado, locação de caminhões Munck, 
              guinchos e empilhadeiras. Qualidade e segurança que sua empresa merece.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#cotacao">
                <Button size="lg" className="font-semibold">
                  Solicitar Cotação
                </Button>
              </a>
              <a href="#equipamentos">
                <Button variant="outline" size="lg" className="font-semibold">
                  Ver Equipamentos
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-display font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Anos de experiência</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clientes atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Veículos na frota</p>
              </div>
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
