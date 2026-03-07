"use client"

import { ShieldCheck, Target, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section aria-label="Sobre a JR Pesados" className="py-12 lg:py-20 bg-background relative overflow-hidden">
      {/* Decorative background element - Hidden on small mobile for cleaner look */}
      <div className="hidden md:block absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="text-center lg:text-left">
              <span className="text-primary font-bold text-xs lg:text-sm uppercase tracking-[0.2em]">
                Nossa Trajetória
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mt-4 leading-tight uppercase">
                Excelência em <br className="hidden lg:block" />
                <span className="text-primary">Transporte e Logística</span>
              </h2>
            </div>

            <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-muted-foreground leading-relaxed text-center lg:text-left">
              <p className="font-medium text-foreground">
                Fundada em 2010, a JR Transportes e Logística consolidou sua trajetória com base em um compromisso inabalável com a inovação e a excelência técnica.
              </p>
              <p>
                Desde 2022, tornamo-nos referência nacional, dispondo de uma frota de última geração e equipamentos especializados para operações críticas. Nossa estrutura robusta e time de especialistas permitem atender demandas de alta complexidade com foco total em <span className="text-foreground font-semibold">segurança, eficiência e confiabilidade</span>.
              </p>
              <p className="hidden sm:block">
                Através de projetos personalizados, planejamento estratégico rigoroso e acompanhamento técnico em tempo real, garantimos resultados de alto desempenho que impulsionam o sucesso de nossos parceiros em todo o território brasileiro.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground uppercase">Segurança</p>
                <p className="text-xs text-muted-foreground">Protocolos rígidos de operação</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground uppercase">Precisão</p>
                <p className="text-xs text-muted-foreground">Planejamento técnico detalhado</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground uppercase">Qualidade</p>
                <p className="text-xs text-muted-foreground">Excelência em cada etapa</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square sm:aspect-video lg:aspect-square rounded-2xl bg-secondary/50 border border-border flex items-center justify-center relative overflow-hidden group">
              <img
                src="/images/truck-rosa.jpg"
                alt="Truck JR Pesados na área Sobre"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/800x800/1a1a1a/ffaa00?text=truck-rosa.jpg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              
              {/* Float Badge - Adjusted for mobile */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 p-4 lg:p-6 bg-card/90 backdrop-blur border border-border rounded-xl shadow-2xl">
                <p className="text-2xl lg:text-3xl font-display font-black text-primary">16 ANOS</p>
                <p className="text-[10px] lg:text-sm font-bold text-foreground uppercase tracking-widest">De Expertise Técnica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
