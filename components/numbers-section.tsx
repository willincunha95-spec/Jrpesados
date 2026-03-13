import { ShieldCheck, Wrench, Users, Calendar, Truck } from "lucide-react"

const numbers = [
  { icon: Calendar, value: "16", suffix: "+", label: "anos de experiência" },
  { icon: Wrench, value: "30", suffix: "+", label: "equipamentos disponíveis" },
  { icon: Users, value: "20", suffix: "+", label: "especialistas em operação" },
  { icon: Truck, value: "15", suffix: "+", label: "caminhões na frota" },
]

export function NumbersSection() {
  return (
    <section aria-label="Nossos números" className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {numbers.map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  <span className="text-primary">{item.value}</span>
                  {item.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
