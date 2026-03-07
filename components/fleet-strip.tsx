import { Truck, Wrench, Package, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const fleet = [
  {
    icon: Wrench,
    title: "Caminhão Munck",
    desc: "Capacidades diversas para içamento e remoção",
  },
  {
    icon: Truck,
    title: "Guincho Pesado",
    desc: "Resgate e remoção de veículos e equipamentos",
  },
  {
    icon: Package,
    title: "Empilhadeira",
    desc: "Movimentação interna de cargas",
  },
  {
    icon: Building2,
    title: "Guindaste",
    desc: "Içamentos especiais e alta elevação",
  },
]

export function FleetStrip() {
  return (
    <section aria-label="Nossa frota" className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Frota disponível
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Veículos e equipamentos para sua operação
            </h2>
          </div>
          <a href="#equipamentos">
            <Button variant="outline" size="sm">Ver catálogo</Button>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fleet.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
