"use client"

import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "25+", label: "Anos de experiência" },
  { value: "500+", label: "Clientes atendidos" },
  { value: "50+", label: "Veículos na frota" },
  { value: "24h", label: "Atendimento" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero content */}
      <div className="flex-1 flex items-center pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className="space-y-8 lg:space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Líderes em Transportes Pesados</span>
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] tracking-tight">
                  Soluções em{" "}
                  <span className="italic">Transportes</span> e{" "}
                  <span className="italic">Locação</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Há mais de 25 anos oferecendo serviços de transporte pesado e locação de equipamentos com excelência e segurança.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#cotacao">
                  <Button size="lg" className="rounded-full px-8 gap-2 group h-14 text-base">
                    Solicitar Cotação
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#sobre">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base">
                    Conhecer mais
                  </Button>
                </a>
              </div>
            </div>

            {/* Right content - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-secondary">
                <Image
                  src="/images/frota.jpg"
                  alt="Frota JR Pesados"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-card border border-border p-6 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-4xl lg:text-5xl font-display text-foreground">25+</p>
                <p className="text-sm text-muted-foreground mt-1">Anos de experiência no mercado brasileiro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 lg:py-10 px-4 lg:px-8 text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-display text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
