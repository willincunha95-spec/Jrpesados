"use client"

import { Truck, Package, Wrench, Building2, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Transporte Pesado",
    description:
      "Transporte de cargas pesadas e superdimensionadas com total segurança. Atendemos indústrias, construção civil e eventos.",
    features: ["Cargas até 50 toneladas", "Escolta especializada", "Rotas otimizadas"],
  },
  {
    icon: Package,
    title: "Remoções Industriais",
    description:
      "Remoção e translocação de máquinas e equipamentos industriais. Planejamento completo e execução segura.",
    features: ["Desmontagem e montagem", "Ancoragem profissional", "Seguro total"],
  },
  {
    icon: Wrench,
    title: "Locação de Munck",
    description:
      "Caminhões Munck de diversas capacidades para içamento e movimentação de cargas em obras e indústrias.",
    features: ["Operador qualificado", "Manutenção inclusa", "Disponibilidade 24h"],
  },
  {
    icon: Building2,
    title: "Locação de Equipamentos",
    description:
      "Empilhadeiras, guindastes, plataformas elevatórias e outros equipamentos para sua operação.",
    features: ["Frota renovada", "Entrega rápida", "Suporte técnico"],
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            O que fazemos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em transporte pesado e locação de equipamentos, 
            sempre com foco na segurança e qualidade do serviço.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
