import { ShieldCheck, BadgeCheck, Clock, MapPin } from "lucide-react"

const items = [
  { icon: ShieldCheck, title: "Seguro RCTR-C e RCF-DC" },
  { icon: BadgeCheck, title: "Equipe treinada e certificada" },
  { icon: Clock, title: "Operação e atendimento 24h" },
  { icon: MapPin, title: "Cobertura em todo o Brasil" },
]

export function TrustBar() {
  return (
    <section aria-label="Garantias e diferenciais" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-2">
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
