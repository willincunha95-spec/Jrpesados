"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Loader2, Package, User, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getLocacoesAtivas, type Locacao } from "@/lib/api"

// Mock data for when API is not available
const mockLocacoes: Locacao[] = [
  { id: 1, cliente: "Construtora ABC", equipamento: "Caminhão Munck 15t", dataInicio: "2024-01-10", dataFim: "2024-02-10", valorTotal: 45000, status: "ATIVA" },
  { id: 2, cliente: "Indústria XYZ", equipamento: "Empilhadeira 3t", dataInicio: "2024-01-05", dataFim: "2024-01-20", valorTotal: 12000, status: "ATIVA" },
  { id: 3, cliente: "Logística Beta", equipamento: "Guindaste Telescópico", dataInicio: "2024-01-15", dataFim: "2024-03-15", valorTotal: 105000, status: "ATIVA" },
  { id: 4, cliente: "Metalúrgica Delta", equipamento: "Caminhão Munck 25t", dataInicio: "2023-12-01", dataFim: "2024-01-01", valorTotal: 66000, status: "FINALIZADA" },
  { id: 5, cliente: "Porto Santos", equipamento: "Guincho Pesado", dataInicio: "2024-01-08", dataFim: "2024-01-22", valorTotal: 25200, status: "ATIVA" },
  { id: 6, cliente: "Empresa Gamma", equipamento: "Plataforma Elevatória", dataInicio: "2023-11-15", dataFim: "2023-12-15", valorTotal: 28500, status: "CANCELADA" },
]

const statusConfig = {
  ATIVA: { label: "Ativa", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  FINALIZADA: { label: "Finalizada", className: "bg-muted text-muted-foreground border-border" },
  CANCELADA: { label: "Cancelada", className: "bg-destructive/10 text-destructive border-destructive/20" },
}

export default function LocacoesPage() {
  const [locacoes, setLocacoes] = useState<Locacao[]>(mockLocacoes)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "ATIVA" | "FINALIZADA">("all")

  useEffect(() => {
    async function fetchLocacoes() {
      try {
        const data = await getLocacoesAtivas()
        if (data.length > 0) {
          setLocacoes(data)
        }
      } catch (err) {
        console.log("Using mock data - API not available")
      } finally {
        setLoading(false)
      }
    }
    fetchLocacoes()
  }, [])

  const filteredLocacoes = locacoes.filter((l) => {
    if (filter === "all") return true
    return l.status === filter
  })

  const totalAtivas = locacoes.filter(l => l.status === "ATIVA").length
  const valorTotalAtivas = locacoes
    .filter(l => l.status === "ATIVA")
    .reduce((acc, l) => acc + l.valorTotal, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Locações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os contratos de locação ativos
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalAtivas}</p>
          <p className="text-sm text-muted-foreground">Locações Ativas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {valorTotalAtivas.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Valor Total Ativo</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {new Set(locacoes.filter(l => l.status === "ATIVA").map(l => l.cliente)).size}
          </p>
          <p className="text-sm text-muted-foreground">Clientes Ativos</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>
        <Button
          variant={filter === "ATIVA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("ATIVA")}
        >
          Ativas
        </Button>
        <Button
          variant={filter === "FINALIZADA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("FINALIZADA")}
        >
          Finalizadas
        </Button>
      </div>

      {/* Locações list */}
      <div className="grid gap-4">
        {filteredLocacoes.map((locacao) => {
          const status = statusConfig[locacao.status]
          const diasRestantes = Math.ceil(
            (new Date(locacao.dataFim).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )

          return (
            <div key={locacao.id} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{locacao.equipamento}</h3>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {locacao.cliente}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Início: </span>
                      <span className="text-foreground">
                        {new Date(locacao.dataInicio).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Fim: </span>
                      <span className="text-foreground">
                        {new Date(locacao.dataFim).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  {locacao.status === "ATIVA" && diasRestantes > 0 && (
                    <Badge variant="secondary">
                      {diasRestantes} dias restantes
                    </Badge>
                  )}
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      R$ {locacao.valorTotal.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-xs text-muted-foreground">valor total</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
