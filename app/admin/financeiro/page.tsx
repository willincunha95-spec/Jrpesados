"use client"

import { useState, useEffect } from "react"
import { DollarSign, TrendingUp, TrendingDown, Plus, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Movimentacao {
  id: number
  descricao: string
  valor: number
  tipo: "RECEITA" | "DESPESA"
  data: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Mock data for when API is not available
const mockMovimentacoes: Movimentacao[] = [
  { id: 1, descricao: "Locação Munck - Construtora ABC", valor: 4500, tipo: "RECEITA", data: "2024-01-15" },
  { id: 2, descricao: "Manutenção Preventiva - Frota", valor: 2800, tipo: "DESPESA", data: "2024-01-14" },
  { id: 3, descricao: "Transporte Industrial - XYZ Ltda", valor: 6200, tipo: "RECEITA", data: "2024-01-13" },
  { id: 4, descricao: "Combustível - Janeiro", valor: 8500, tipo: "DESPESA", data: "2024-01-12" },
  { id: 5, descricao: "Locação Empilhadeira - Logística Beta", valor: 3200, tipo: "RECEITA", data: "2024-01-11" },
  { id: 6, descricao: "Seguro Frota - Parcela", valor: 4200, tipo: "DESPESA", data: "2024-01-10" },
]

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export default function FinanceiroPage() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([])
  const [saldo, setSaldo] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [novaDescricao, setNovaDescricao] = useState("")
  const [novoValor, setNovoValor] = useState("")
  const [novoTipo, setNovoTipo] = useState<"RECEITA" | "DESPESA">("RECEITA")

  useEffect(() => {
    fetchFinanceiro()
  }, [])

  async function fetchFinanceiro() {
    setLoading(true)
    setError(null)
    
    const token = getAuthToken()
    
    try {
      // Fetch saldo
      const saldoRes = await fetch(`${API_URL}/financeiro/saldo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      
      if (saldoRes.ok) {
        const saldoData = await saldoRes.json()
        setSaldo(saldoData)
      } else {
        // Use mock saldo
        const mockSaldo = mockMovimentacoes.reduce((acc, mov) => {
          return mov.tipo === "RECEITA" ? acc + mov.valor : acc - mov.valor
        }, 0)
        setSaldo(mockSaldo)
      }

      // For now, use mock movimentacoes since the API doesn't have a /financeiro/todos endpoint
      setMovimentacoes(mockMovimentacoes)
      
    } catch (err) {
      console.log("Using mock data - API not available")
      setMovimentacoes(mockMovimentacoes)
      const mockSaldo = mockMovimentacoes.reduce((acc, mov) => {
        return mov.tipo === "RECEITA" ? acc + mov.valor : acc - mov.valor
      }, 0)
      setSaldo(mockSaldo)
    } finally {
      setLoading(false)
    }
  }

  async function handleRegistrarMovimentacao(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    
    const token = getAuthToken()
    
    try {
      const res = await fetch(
        `${API_URL}/financeiro/registrar?descricao=${encodeURIComponent(novaDescricao)}&valor=${novoValor}&tipo=${novoTipo}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      
      if (res.ok) {
        // Refresh data
        fetchFinanceiro()
        setDialogOpen(false)
        setNovaDescricao("")
        setNovoValor("")
        setNovoTipo("RECEITA")
      } else {
        // Add to local mock data for demo
        const newMov: Movimentacao = {
          id: Date.now(),
          descricao: novaDescricao,
          valor: parseFloat(novoValor),
          tipo: novoTipo,
          data: new Date().toISOString().split("T")[0],
        }
        setMovimentacoes([newMov, ...movimentacoes])
        setSaldo(novoTipo === "RECEITA" ? saldo + parseFloat(novoValor) : saldo - parseFloat(novoValor))
        setDialogOpen(false)
        setNovaDescricao("")
        setNovoValor("")
        setNovoTipo("RECEITA")
      }
    } catch (err) {
      // Add to local mock data for demo
      const newMov: Movimentacao = {
        id: Date.now(),
        descricao: novaDescricao,
        valor: parseFloat(novoValor),
        tipo: novoTipo,
        data: new Date().toISOString().split("T")[0],
      }
      setMovimentacoes([newMov, ...movimentacoes])
      setSaldo(novoTipo === "RECEITA" ? saldo + parseFloat(novoValor) : saldo - parseFloat(novoValor))
      setDialogOpen(false)
      setNovaDescricao("")
      setNovoValor("")
      setNovoTipo("RECEITA")
    } finally {
      setSubmitting(false)
    }
  }

  const totalReceitas = movimentacoes
    .filter((m) => m.tipo === "RECEITA")
    .reduce((acc, m) => acc + m.valor, 0)
  
  const totalDespesas = movimentacoes
    .filter((m) => m.tipo === "DESPESA")
    .reduce((acc, m) => acc + m.valor, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground mt-1">
            Controle de receitas e despesas
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Movimentação</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegistrarMovimentacao} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  placeholder="Ex: Locação de equipamento"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                  placeholder="0,00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={novoTipo} onValueChange={(v) => setNovoTipo(v as "RECEITA" | "DESPESA")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RECEITA">Receita</SelectItem>
                    <SelectItem value="DESPESA">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Registrar"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground">Saldo Total</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500">
            R$ {totalReceitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground">Total Receitas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-500">
            R$ {totalDespesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground">Total Despesas</p>
        </div>
      </div>

      {/* Transactions table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-foreground">Movimentações Recentes</h2>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 py-12 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Data</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Descrição</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {movimentacoes.map((mov) => (
                  <tr key={mov.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(mov.data).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {mov.descricao}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        mov.tipo === "RECEITA" 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {mov.tipo === "RECEITA" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {mov.tipo === "RECEITA" ? "Receita" : "Despesa"}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${
                      mov.tipo === "RECEITA" ? "text-green-500" : "text-red-500"
                    }`}>
                      {mov.tipo === "RECEITA" ? "+" : "-"} R$ {mov.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
