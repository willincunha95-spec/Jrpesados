"use client"

import { Truck, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: Truck,
    value: "50+",
    label: "Equipamentos disponíveis",
  },
  {
    icon: Users,
    value: "30+",
    label: "Segmentos de atuação",
  },
  {
    icon: Award,
    value: "500+",
    label: "Projetos realizados",
  },
  {
    icon: Clock,
    value: "15",
    label: "Anos de experiência",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 mb-4">
                <stat.icon className="h-7 w-7 text-accent" />
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-sm lg:text-base text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
