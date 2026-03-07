"use client"

import { useEffect, useState } from "react"

const clients = [
  { name: "Sabesp", logo: "/images/clients/sabesp.png" },
  { name: "FGS", logo: "/images/clients/fgs.png" },
  { name: "Tauá", logo: "/images/clients/taua.png" },
  { name: "Sabesp", logo: "/images/clients/sabesp.png" },
  { name: "FGS", logo: "/images/clients/fgs.png" },
  { name: "Tauá", logo: "/images/clients/taua.png" },
]

export function ClientsCarousel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Parceiros de Sucesso
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
            Empresas que confiam em nós
          </h2>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        <div 
          className={`flex gap-12 ${mounted ? 'animate-scroll' : ''}`}
          style={{
            width: 'max-content',
          }}
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-40 h-24 flex items-center justify-center px-6 group"
            >
              <div className="w-full h-full bg-card rounded-xl border border-border flex items-center justify-center p-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg">
                <span 
                  className="text-xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 select-none"
                >
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
