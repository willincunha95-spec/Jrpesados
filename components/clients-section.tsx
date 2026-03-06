"use client";

import Image from "next/image";

const clients = [
  {
    name: "Sabesp",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sabesp-tfY7mocB7092DYGAyt0RyVO14Vap4o.jpg",
  },
  {
    name: "FGS",
    logo: null,
  },
  {
    name: "Hotel Resorts Tauá",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hotel%20Resorst%20maua-QLSnz8RdpXu6IU94dSjOtt3Dnkec93.jpg",
  },
];

export function ClientsSection() {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium mb-3 tracking-wider uppercase text-sm">
            Nossos Clientes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Empresas que Confiam em Nós
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Temos o orgulho de atender grandes empresas e contribuir para o
            sucesso de suas operações logísticas.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 px-8 md:px-12"
              >
                <div className="flex flex-col items-center justify-center w-40 md:w-48 h-32 md:h-40 bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
                  {client.logo ? (
                    <div className="relative w-full h-16 md:h-20 grayscale group-hover:grayscale-0 transition-all duration-300">
                      <Image
                        src={client.logo}
                        alt={`Logo ${client.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-16 md:h-20">
                      <span className="text-2xl font-bold text-primary">
                        {client.name}
                      </span>
                    </div>
                  )}
                  <p className="mt-3 text-sm text-muted-foreground font-medium">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
