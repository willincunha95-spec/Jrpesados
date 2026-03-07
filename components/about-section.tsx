"use client"

import Image from "next/image"

const values = [
  {
    number: "01",
    title: "Excelência Operacional",
    description: "Frota moderna e equipamentos de última geração para garantir a máxima eficiência em cada operação.",
  },
  {
    number: "02",
    title: "Compromisso com Segurança",
    description: "Todos os processos seguem rigorosos protocolos de segurança, priorizando a integridade de cargas e pessoas.",
  },
  {
    number: "03",
    title: "Atendimento Nacional",
    description: "Estrutura completa para atender todo o território brasileiro com agilidade e qualidade.",
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
            Sobre nós
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 leading-tight">
            Fundada em 2010, a JR Transportes e Logística consolidou sua trajetória com compromisso na{" "}
            <span className="italic">inovação</span> e{" "}
            <span className="italic">excelência técnica</span>.
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-secondary">
              <Image
                src="/images/frota.jpg"
                alt="Nossa Frota"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-border rounded-3xl hidden lg:block" />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center space-y-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desde 2022, somos referência em todo o Brasil, dispondo de frota moderna e equipamentos especializados. Nossa missão é oferecer soluções completas em transporte pesado e locação de equipamentos, sempre priorizando a segurança, qualidade e satisfação dos nossos clientes.
            </p>

            {/* Values */}
            <div className="space-y-8">
              {values.map((value) => (
                <div key={value.number} className="flex gap-6 group">
                  <span className="text-sm font-medium text-accent">{value.number}</span>
                  <div className="flex-1 pb-8 border-b border-border group-last:border-0 group-last:pb-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
