"use client"

import { Calendar, Package, Truck, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for demo
const mockHistorico = [
  {
    id: 1,
    tipo: "Locação",
    descricao: "Caminhão Munck 15t - 45 dias",
    data: "01/03/2026",
    valor: 67500,
    status: "Ativo",
    notaFiscal: "NF-001234",
  },
  {
    id: 2,
    tipo: "Transporte",
    descricao: "Equipamento Industrial - SP > Campinas",
    data: "25/02/2026",
    valor: 3500,
    status: "Concluído",
    notaFiscal: "NF-001233",
  },
  {
    id: 3,
    tipo: "Locação",
    descricao: "Empilhadeira 3t - 30 dias",
    data: "10/02/2026",
    valor: 24000,
    status: "Ativo",
    notaFiscal: "NF-001232",
  },
  {
    id: 4,
    tipo: "Remoção",
    descricao: "Máquinas CNC - Relocação industrial",
    data: "05/02/2026",
    valor: 8500,
    status: "Concluído",
    notaFiscal: "NF-001231",
  },
  {
    id: 5,
    tipo: "Locação",
    descricao: "Plataforma Elevatória - 60 dias",
    data: "01/01/2026",
    valor: 57000,
    status: "Concluído",
    notaFiscal: "NF-001230",
  },
]

const tipoIcons = {
  Locação: Package,
  Transporte: Truck,
  Remoção: FileText,
}

export default function HistoricoPage() {
  const totalGasto = mockHistorico.reduce((acc, item) => acc + item.valor, 0)
  const totalServicos = mockHistorico.length
  const servicosAtivos = mockHistorico.filter(h => h.status === "Ativo").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Histórico de Serviços</h1>
        <p className="text-muted-foreground mt-1">
          Veja todos os seus serviços contratados
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Total de Serviços</p>
          <p className="text-3xl font-bold text-foreground mt-1">{totalServicos}</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Serviços Ativos</p>
          <p className="text-3xl font-bold text-primary mt-1">{servicosAtivos}</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Total Investido</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            R$ {totalGasto.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Todos os Serviços</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        <div className="divide-y divide-border">
          {mockHistorico.map((item) => {
            const Icon = tipoIcons[item.tipo as keyof typeof tipoIcons] || FileText
            
            return (
              <div key={item.id} className="p-4 hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.tipo}</Badge>
                      <span className={`text-xs ${
                        item.status === "Ativo" ? "text-green-500" : "text-muted-foreground"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="font-medium text-foreground">{item.descricao}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.data}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.notaFiscal}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      R$ {item.valor.toLocaleString("pt-BR")}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
