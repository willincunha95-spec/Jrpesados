"use client"

import Image from "next/image"
import { Truck, Package, Wrench, Building2, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Transportes Pesados",
    description: "Transporte de cargas pesadas e indivisíveis com total segurança para indústrias, construção civil e eventos.",
    features: ["Cargas até 50 toneladas", "Escolta especializada", "Rotas otimizadas"],
    image: "/images/hero-truck.jpg",
  },
  {
    icon: Package,
    title: "Remoções Técnicas",
    description: "Remoção e translocação de máquinas e equipamentos industriais com planejamento completo e execução segura.",
    features: ["Desmontagem e montagem", "Ancoragem profissional", "Seguro total"],
    image: "/images/fleet.jpg",
  },
  {
    icon: Wrench,
    title: "Carga/Descarga e Içamento",
    description: "Caminhões Munck de diversas capacidades para içamento e movimentação de cargas em obras e indústrias.",
    features: ["Operador qualificado", "Manutenção inclusa", "Disponibilidade 24h"],
    image: "/images/munck-truck.jpg",
  },
  {
    icon: Building2,
    title: "Locação de Equipamentos",
    description: "Empilhadeiras, guindastes, plataformas elevatórias e outros equipamentos para sua operação.",
    features: ["Frota renovada", "Entrega rápida", "Suporte técnico"],
    image: "/images/forklift.jpg",
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Serviços</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Soluções Completas em Logística Pesada
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços para atender todas as suas necessidades 
            em transportes pesados e movimentação de cargas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <a
              key={service.title}
              href="#cotacao"
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
