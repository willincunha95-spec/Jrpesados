"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-truck.jpg"
          alt="Frota JR Transportes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Desde 2010 no mercado</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Soluções Completas em{" "}
            <span className="text-accent">Transportes Pesados</span>{" "}
            e Logística
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            Referência em todo o Brasil, oferecemos frota moderna e equipamentos especializados 
            para transportes pesados, remoções industriais e locação de equipamentos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cotacao">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-14 text-base gap-2 group w-full sm:w-auto">
                Solicitar Orçamento
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#servicos">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8 h-14 text-base gap-2 w-full sm:w-auto"
              >
                <Play className="h-5 w-5" />
                Nossos Serviços
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-accent">15+</p>
              <p className="text-sm text-white/60">Anos de Experiência</p>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            <div>
              <p className="text-3xl font-bold text-accent">500+</p>
              <p className="text-sm text-white/60">Projetos Realizados</p>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            <div>
              <p className="text-3xl font-bold text-accent">24h</p>
              <p className="text-sm text-white/60">Atendimento</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
