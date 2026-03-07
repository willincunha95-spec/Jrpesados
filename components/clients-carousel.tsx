"use client"

const clients = [
  { name: "SABESP" },
  { name: "FGS" },
  { name: "TAUÁ" },
  { name: "SABESP" },
  { name: "FGS" },
  { name: "TAUÁ" },
]

export function ClientsCarousel() {
  return (
    <section className="py-16 lg:py-20 border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Parceiros
            </span>
            <h2 className="font-display text-2xl lg:text-3xl text-foreground mt-2">
              Empresas que confiam em nós
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Orgulhosos de atender grandes empresas com excelência e comprometimento.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 px-8 lg:px-12"
            >
              <div className="h-16 lg:h-20 flex items-center justify-center px-8 lg:px-12 border border-border rounded-2xl bg-card hover:border-accent/50 transition-colors group min-w-[160px] lg:min-w-[200px]">
                <span className="text-xl lg:text-2xl font-display text-muted-foreground/60 group-hover:text-foreground transition-colors tracking-tight">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
