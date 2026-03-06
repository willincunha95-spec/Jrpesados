"use client"

import { Package, Calendar, MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for demo
const mockLocacoes = [
  {
    id: 1,
    equipamento: "Caminhão Munck 15t",
    marca: "Mercedes-Benz",
    modelo: "Atego 2426",
    status: "ATIVO",
    dataInicio: "01/03/2026",
    dataFim: "15/04/2026",
    valorDiaria: 1500,
    local: "Obra Central - São Paulo, SP",
    operador: "José Oliveira",
  },
  {
    id: 2,
    equipamento: "Empilhadeira 3t",
    marca: "Hyster",
    modelo: "H60FT",
    status: "ATIVO",
    dataInicio: "10/03/2026",
    dataFim: "20/04/2026",
    valorDiaria: 800,
    local: "CD Logístico - Guarulhos, SP",
    operador: "Autônomo",
  },
  {
    id: 3,
    equipamento: "Plataforma Elevatória",
    marca: "JLG",
    modelo: "860SJ",
    status: "FINALIZADO",
    dataInicio: "01/01/2026",
    dataFim: "28/02/2026",
    valorDiaria: 950,
    local: "Shopping Center - Campinas, SP",
    operador: "Roberto Carlos",
  },
]

const statusConfig = {
  ATIVO: { label: "Ativo", variant: "default" as const },
  FINALIZADO: { label: "Finalizado", variant: "secondary" as const },
  PENDENTE: { label: "Pendente", variant: "outline" as const },
}

export default function LocacoesPage() {
  const locacoesAtivas = mockLocacoes.filter(l => l.status === "ATIVO")
  const locacoesFinalizadas = mockLocacoes.filter(l => l.status === "FINALIZADO")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Minhas Locações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seus equipamentos alugados
        </p>
      </div>

      {/* Locações ativas */}
      <div>
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Locações Ativas ({locacoesAtivas.length})
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {locacoesAtivas.map((locacao) => (
            <div
              key={locacao.id}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{locacao.equipamento}</h3>
                    <p className="text-sm text-muted-foreground">
                      {locacao.marca} - {locacao.modelo}
                    </p>
                  </div>
                </div>
                <Badge variant={statusConfig[locacao.status as keyof typeof statusConfig].variant}>
                  {statusConfig[locacao.status as keyof typeof statusConfig].label}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{locacao.dataInicio} até {locacao.dataFim}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{locacao.local}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Operador: {locacao.operador}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Valor diária</p>
                  <p className="text-lg font-bold text-primary">
                    R$ {locacao.valorDiaria.toLocaleString("pt-BR")}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locações finalizadas */}
      {locacoesFinalizadas.length > 0 && (
        <div>
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            Locações Finalizadas ({locacoesFinalizadas.length})
          </h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Equipamento</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Local</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Período</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {locacoesFinalizadas.map((locacao) => (
                  <tr key={locacao.id} className="hover:bg-secondary/20">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{locacao.equipamento}</p>
                      <p className="text-sm text-muted-foreground">{locacao.marca}</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">
                      {locacao.local}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {locacao.dataInicio} - {locacao.dataFim}
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">Finalizado</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
