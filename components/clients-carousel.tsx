"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const clients = [
  {
    name: "Sabesp",
    logo: "/images/clientes/sabesp.jpg",
  },
  {
    name: "FGS",
    logo: "/images/clientes/fgs.jpg",
  },
  {
    name: "Hotel Resorts Tauá",
    logo: "/images/clientes/taua.jpg",
  },
]

export function ClientsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clients.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Parceiros de Confiança
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
            Nossos Clientes
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Empresas que confiam na JR Pesados para suas operações de transporte e logística
          </p>
        </div>

        {/* Desktop: Show all logos */}
        <div className="hidden md:flex justify-center items-center gap-12 flex-wrap">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl transition-all hover:bg-secondary/50"
            >
              <div className="w-32 h-32 rounded-xl bg-background border border-border flex items-center justify-center p-4 group-hover:border-primary/50 transition-colors">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={100}
                  className="object-contain max-h-20"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-xl bg-background border border-border flex items-center justify-center p-6 transition-all">
              <Image
                src={clients[activeIndex].logo}
                alt={clients[activeIndex].name}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <span className="mt-4 text-sm font-medium text-foreground">
              {clients[activeIndex].name}
            </span>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Ver cliente ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
