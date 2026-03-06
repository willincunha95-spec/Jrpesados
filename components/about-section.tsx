import { Truck, Award, MapPin, Clock } from "lucide-react";

const stats = [
  {
    icon: Truck,
    value: "15+",
    label: "Anos de Experiência",
  },
  {
    icon: Award,
    value: "100%",
    label: "Compromisso",
  },
  {
    icon: MapPin,
    value: "Brasil",
    label: "Cobertura Nacional",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Disponibilidade",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-secondary font-medium mb-3 tracking-wider uppercase text-sm">
            Sobre Nós
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Nossa História
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fundada em 2010, a JR Transportes e Logística consolidou sua
            trajetória com compromisso na inovação e excelência técnica. Desde
            2022, somos referência em todo o Brasil, dispondo de frota moderna e
            equipamentos especializados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
