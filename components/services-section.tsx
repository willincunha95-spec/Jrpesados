"use client"

import { Truck, Package, Wrench, Building2, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Transporte Pesado",
    description: "Transporte de cargas pesadas e superdimensionadas com total segurança para indústrias, construção civil e eventos.",
    features: ["Cargas até 50 toneladas", "Escolta especializada", "Rotas otimizadas"],
  },
  {
    icon: Package,
    title: "Remoções Industriais",
    description: "Remoção e translocação de máquinas e equipamentos industriais com planejamento completo e execução segura.",
    features: ["Desmontagem e montagem", "Ancoragem profissional", "Seguro total"],
  },
  {
    icon: Wrench,
    title: "Locação de Munck",
    description: "Caminhões Munck de diversas capacidades para içamento e movimentação de cargas em obras e indústrias.",
    features: ["Operador qualificado", "Manutenção inclusa", "Disponibilidade 24h"],
  },
  {
    icon: Building2,
    title: "Locação de Equipamentos",
    description: "Empilhadeiras, guindastes, plataformas elevatórias e outros equipamentos para sua operação.",
    features: ["Frota renovada", "Entrega rápida", "Suporte técnico"],
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
            Serviços
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 leading-tight">
            Soluções completas em transporte e <span className="italic">logística pesada</span>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <a
              key={service.title}
              href="#cotacao"
              className={`group relative p-8 lg:p-10 rounded-3xl border border-border bg-card hover:bg-secondary/50 transition-all hover:border-accent/30 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`flex flex-col ${index === 0 ? "lg:flex-row lg:items-start lg:gap-12" : ""}`}>
                {/* Icon */}
                <div className="mb-6 lg:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-4" />
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 text-sm bg-secondary text-muted-foreground rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
