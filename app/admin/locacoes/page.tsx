"use client"

import { useState, useEffect } from "react"
import { Package, Calendar, User, Loader2, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Locacao {
  id: number
  equipamento: string
  cliente: string
  dataInicio: string
  dataFim: string | null
  valorTotal: number
  status: "ATIVA" | "FINALIZADA" | "CANCELADA" | "PENDENTE"
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Mock data for when API is not available
const mockLocacoes: Locacao[] = [
  { id: 1, equipamento: "Caminhão Munck 15t", cliente: "Construtora ABC", dataInicio: "2024-01-10", dataFim: null, valorTotal: 4500, status: "ATIVA" },
  { id: 2, equipamento: "Empilhadeira 3t", cliente: "Logística Beta", dataInicio: "2024-01-08", dataFim: null, valorTotal: 2400, status: "ATIVA" },
  { id: 3, equipamento: "Guindaste Telescópico", cliente: "Indústria XYZ", dataInicio: "2024-01-05", dataFim: "2024-01-12", valorTotal: 10500, status: "FINALIZADA" },
  { id: 4, equipamento: "Caminhão Munck 25t", cliente: "Metalúrgica Delta", dataInicio: "2024-01-15", dataFim: null, valorTotal: 6600, status: "PENDENTE" },
  { id: 5, equipamento: "Plataforma Elevatória", cliente: "Construções SA", dataInicio: "2024-01-02", dataFim: "2024-01-09", valorTotal: 3800, status: "FINALIZADA" },
  { id: 6, equipamento: "Guincho Pesado", cliente: "Trans Norte", dataInicio: "2024-01-12", dataFim: null, valorTotal: 5400, status: "ATIVA" },
]

const statusConfig = {
  ATIVA: { label: "Ativa", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
  FINALIZADA: { label: "Finalizada", color: "bg-blue-500/10 text-blue-500", icon: CheckCircle },
  CANCELADA: { label: "Cancelada", color: "bg-red-500/10 text-red-500", icon: XCircle },
  PENDENTE: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-500", icon: Clock },
}

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export default function LocacoesPage() {
  const [locacoes, setLocacoes] = useState<Locacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchLocacoes()
  }, [])

  async function fetchLocacoes() {
    setLoading(true)
    setError(null)
    
    const token = getAuthToken()
    
    try {
      // Try to fetch from API - GET /locacoes/ativas
      const res = await fetch(`${API_URL}/locacoes/ativas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          setLocacoes(data)
        } else {
          setLocacoes(mockLocacoes)
        }
      } else {
        // Use mock data
        setLocacoes(mockLocacoes)
      }
    } catch (err) {
      console.log("Using mock data - API not available")
      setLocacoes(mockLocacoes)
    } finally {
      setLoading(false)
    }
  }

  const filteredLocacoes = locacoes.filter((loc) => {
    if (filter === "all") return true
    return loc.status === filter
  })

  const stats = {
    total: locacoes.length,
    ativas: locacoes.filter((l) => l.status === "ATIVA").length,
    pendentes: locacoes.filter((l) => l.status === "PENDENTE").length,
    valorTotal: locacoes
      .filter((l) => l.status === "ATIVA")
      .reduce((acc, l) => acc + l.valorTotal, 0),
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Locações</h1>
        <p className="text-muted-foreground mt-1">
          Gestão de contratos de locação de equipamentos
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Locações</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.ativas}</p>
          <p className="text-sm text-muted-foreground">Locações Ativas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-500">{stats.pendentes}</p>
          <p className="text-sm text-muted-foreground">Pendentes</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {stats.valorTotal.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Valor Ativas</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
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
          variant={filter === "PENDENTE" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("PENDENTE")}
        >
          Pendentes
        </Button>
        <Button
          variant={filter === "FINALIZADA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("FINALIZADA")}
        >
          Finalizadas
        </Button>
      </div>

      {/* Locações table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 py-12 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        ) : filteredLocacoes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mb-4 opacity-50" />
            <p>Nenhuma locação encontrada</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Equipamento</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Início</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Fim</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLocacoes.map((loc) => {
                  const status = statusConfig[loc.status]
                  const StatusIcon = status.icon
                  
                  return (
                    <tr key={loc.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{loc.equipamento}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{loc.cliente}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(loc.dataInicio).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {loc.dataFim ? new Date(loc.dataFim).toLocaleDateString("pt-BR") : "Em aberto"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground text-right">
                        R$ {loc.valorTotal.toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
