"use client"

import { useState, useEffect } from "react"
import { DollarSign, TrendingUp, TrendingDown, Loader2, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFinanceiroTodos, type FinanceiroResumo, type FinanceiroBalanco } from "@/lib/api"

// Mock data for when API is not available
const mockFinanceiro: FinanceiroResumo = {
  totalReceitas: 285000,
  totalDespesas: 142500,
  saldo: 142500,
  lancamentos: [
    { id: 1, descricao: "Locação Munck - Construtora ABC", tipo: "RECEITA", valor: 15000, data: "2024-01-15", categoria: "Locação", status: "PAGO" },
    { id: 2, descricao: "Manutenção Preventiva - Frota", tipo: "DESPESA", valor: 8500, data: "2024-01-14", categoria: "Manutenção", status: "PAGO" },
    { id: 3, descricao: "Transporte Industrial - XYZ Ltda", tipo: "RECEITA", valor: 22000, data: "2024-01-13", categoria: "Transporte", status: "PENDENTE" },
    { id: 4, descricao: "Combustível - Janeiro", tipo: "DESPESA", valor: 12000, data: "2024-01-12", categoria: "Combustível", status: "PAGO" },
    { id: 5, descricao: "Locação Guindaste - Indústria Beta", tipo: "RECEITA", valor: 35000, data: "2024-01-10", categoria: "Locação", status: "PAGO" },
    { id: 6, descricao: "Seguro da Frota", tipo: "DESPESA", valor: 18000, data: "2024-01-08", categoria: "Seguros", status: "ATRASADO" },
  ]
}

const statusConfig = {
  PAGO: { label: "Pago", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  PENDENTE: { label: "Pendente", className: "bg-primary/10 text-primary border-primary/20" },
  ATRASADO: { label: "Atrasado", className: "bg-destructive/10 text-destructive border-destructive/20" },
}

export default function FinanceiroPage() {
  const [financeiro, setFinanceiro] = useState<FinanceiroResumo>(mockFinanceiro)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "RECEITA" | "DESPESA">("all")

  useEffect(() => {
    async function fetchFinanceiro() {
      try {
        const data = await getFinanceiroTodos()
        setFinanceiro(data)
      } catch (err) {
        console.log("Using mock data - API not available")
        // Keep using mock data
      } finally {
        setLoading(false)
      }
    }
    fetchFinanceiro()
  }, [])

  const filteredLancamentos = financeiro.lancamentos.filter((l) => {
    if (filter === "all") return true
    return l.tipo === filter
  })

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
        <h1 className="text-2xl font-display font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe o balanço financeiro e lançamentos
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {financeiro.totalReceitas.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Total Receitas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
            <ArrowDownRight className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {financeiro.totalDespesas.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Total Despesas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${financeiro.saldo >= 0 ? "text-green-500" : "text-red-500"}`}>
            R$ {financeiro.saldo.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Saldo</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={filter === "RECEITA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("RECEITA")}
        >
          Receitas
        </Button>
        <Button
          variant={filter === "DESPESA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("DESPESA")}
        >
          Despesas
        </Button>
      </div>

      {/* Transactions list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Lançamentos</h2>
        </div>
        <div className="divide-y divide-border">
          {filteredLancamentos.map((lancamento) => {
            const status = statusConfig[lancamento.status]
            return (
              <div key={lancamento.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    lancamento.tipo === "RECEITA" ? "bg-green-500/10" : "bg-red-500/10"
                  }`}>
                    {lancamento.tipo === "RECEITA" ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{lancamento.descricao}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{lancamento.categoria}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={status.className}>
                    {status.label}
                  </Badge>
                  <p className={`font-bold ${
                    lancamento.tipo === "RECEITA" ? "text-green-500" : "text-red-500"
                  }`}>
                    {lancamento.tipo === "RECEITA" ? "+" : "-"} R$ {lancamento.valor.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
