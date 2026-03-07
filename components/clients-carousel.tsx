"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const clients = [
  {
    name: "Sabesp",
    logo: (
      <img src="/images/logo-sabesp.jpg" alt="Logo Sabesp" className="w-full h-full object-contain mix-blend-multiply" />
    ),
    bgColor: "bg-white"
  },
  {
    name: "FGS",
    logo: (
      <img src="/images/logo-fgs.png" alt="Logo FGS" className="w-full h-full object-contain mix-blend-multiply" />
    ),
    bgColor: "bg-white"
  },
  {
    name: "Hotel Resorts Tauá",
    logo: (
      <img src="/images/logo-taua.jpg" alt="Logo Hotel Resorts Tauá" className="w-full h-full object-contain mix-blend-multiply" />
    ),
    bgColor: "bg-white"
  }
]

export function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section aria-label="Nossos clientes" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
            Parceiros de Sucesso
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mt-4 uppercase">
            Clientes que <span className="text-primary">confiam</span> em nossa operação
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 p-3 rounded-full bg-card border border-border text-foreground hover:text-primary hover:border-primary transition-all shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 p-3 rounded-full bg-card border border-border text-foreground hover:text-primary hover:border-primary transition-all shadow-lg"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {clients.map((client) => (
                <div 
                  key={client.name} 
                  className="min-w-full p-8 md:p-20 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8"
                >
                  <div className={`w-48 h-24 md:w-64 md:h-32 rounded-2xl ${client.bgColor} flex items-center justify-center p-4 md:p-6 transition-transform hover:scale-105 duration-300`}>
                    <div className="relative w-full h-full flex items-center justify-center text-slate-900">
                       {client.logo}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground uppercase tracking-wider">
                      {client.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mt-2 px-4">Parceiro Estratégico JR Pesados</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {clients.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === idx ? "bg-primary w-8" : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Ir para cliente ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
