import { Truck, Wrench, MapPin, Clock, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Transporte de Cargas Pesadas",
    description:
      "Transporte seguro e eficiente de cargas pesadas e equipamentos especiais em todo o Brasil.",
  },
  {
    icon: Wrench,
    title: "Locação de Equipamentos",
    description:
      "Locação de equipamentos especializados para suas necessidades operacionais.",
  },
  {
    icon: MapPin,
    title: "Logística Integrada",
    description:
      "Soluções logísticas completas com planejamento e execução de ponta a ponta.",
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description:
      "Disponibilidade total para atender suas demandas a qualquer momento.",
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description:
      "Frota moderna e equipe capacitada para garantir a segurança da sua carga.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description:
      "Profissionais experientes e treinados para oferecer o melhor serviço.",
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium mb-3 tracking-wider uppercase text-sm">
            Nossos Serviços
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Soluções Completas em Logística
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferecemos uma ampla gama de serviços para atender todas as suas
            necessidades de transporte e logística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card p-6 md:p-8 rounded-xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300 mb-5">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
