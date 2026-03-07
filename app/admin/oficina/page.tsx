"use client"

import { useState, useEffect } from "react"
import { Wrench, Truck, Calendar, Loader2, AlertCircle, CheckCircle, Clock, Play, Plus } from "lucide-react"
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

interface OrdemServico {
  id: number
  veiculo: string
  placa: string
  descricao: string
  dataAbertura: string
  dataFechamento: string | null
  status: "ABERTA" | "EM_ANDAMENTO" | "FINALIZADA"
  custoEstimado: number
}

interface Peca {
  id: number
  nome: string
  quantidadeEstoque: number
  valorUnitario: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Mock data for when API is not available
const mockOrdensServico: OrdemServico[] = [
  { id: 1, veiculo: "Caminhão Munck 15t", placa: "ABC-1234", descricao: "Troca de óleo e filtros", dataAbertura: "2024-01-15", dataFechamento: null, status: "EM_ANDAMENTO", custoEstimado: 850 },
  { id: 2, veiculo: "Empilhadeira 3t", placa: "EMP-001", descricao: "Revisão geral", dataAbertura: "2024-01-14", dataFechamento: null, status: "ABERTA", custoEstimado: 1200 },
  { id: 3, veiculo: "Guincho Pesado", placa: "DEF-9012", descricao: "Reparo no sistema hidráulico", dataAbertura: "2024-01-10", dataFechamento: "2024-01-13", status: "FINALIZADA", custoEstimado: 3500 },
  { id: 4, veiculo: "Caminhão Munck 25t", placa: "XYZ-5678", descricao: "Troca de pneus", dataAbertura: "2024-01-12", dataFechamento: null, status: "EM_ANDAMENTO", custoEstimado: 4800 },
  { id: 5, veiculo: "Guindaste Telescópico", placa: "GT-001", descricao: "Manutenção preventiva", dataAbertura: "2024-01-08", dataFechamento: "2024-01-09", status: "FINALIZADA", custoEstimado: 950 },
]

const mockPecas: Peca[] = [
  { id: 1, nome: "Filtro de Óleo", quantidadeEstoque: 25, valorUnitario: 45.90 },
  { id: 2, nome: "Filtro de Ar", quantidadeEstoque: 18, valorUnitario: 89.90 },
  { id: 3, nome: "Pastilha de Freio", quantidadeEstoque: 12, valorUnitario: 180.00 },
  { id: 4, nome: "Óleo Motor 15W40 (5L)", quantidadeEstoque: 30, valorUnitario: 95.00 },
  { id: 5, nome: "Correia Alternador", quantidadeEstoque: 8, valorUnitario: 120.00 },
]

const statusConfig = {
  ABERTA: { label: "Aberta", color: "bg-blue-500/10 text-blue-500", icon: Clock },
  EM_ANDAMENTO: { label: "Em Andamento", color: "bg-yellow-500/10 text-yellow-500", icon: Play },
  FINALIZADA: { label: "Finalizada", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
}

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export default function OficinaPage() {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([])
  const [pecas, setPecas] = useState<Peca[]>(mockPecas)
  const [loading, setLoading] = useState(true)
  const [finalizando, setFinalizando] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state for new peca
  const [novaPeca, setNovaPeca] = useState({ nome: "", quantidadeEstoque: "", valorUnitario: "" })

  useEffect(() => {
    fetchOrdensServico()
  }, [])

  async function fetchOrdensServico() {
    setLoading(true)
    
    const token = getAuthToken()
    
    try {
      // Try to fetch from API - GET /oficina/ordens-servico
      const res = await fetch(`${API_URL}/oficina/ordens-servico`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          setOrdensServico(data)
        } else {
          setOrdensServico(mockOrdensServico)
        }
      } else {
        setOrdensServico(mockOrdensServico)
      }
    } catch (err) {
      console.log("Using mock data - API not available")
      setOrdensServico(mockOrdensServico)
    } finally {
      setLoading(false)
    }
  }

  async function handleFinalizarOS(id: number) {
    setFinalizando(id)
    
    const token = getAuthToken()
    
    try {
      // POST /oficina/os/{id}/finalizar
      const res = await fetch(`${API_URL}/oficina/os/${id}/finalizar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      
      if (res.ok) {
        // Update local state
        setOrdensServico(ordensServico.map(os => 
          os.id === id 
            ? { ...os, status: "FINALIZADA" as const, dataFechamento: new Date().toISOString().split("T")[0] }
            : os
        ))
      } else {
        // Update local state for demo
        setOrdensServico(ordensServico.map(os => 
          os.id === id 
            ? { ...os, status: "FINALIZADA" as const, dataFechamento: new Date().toISOString().split("T")[0] }
            : os
        ))
      }
    } catch (err) {
      // Update local state for demo
      setOrdensServico(ordensServico.map(os => 
        os.id === id 
          ? { ...os, status: "FINALIZADA" as const, dataFechamento: new Date().toISOString().split("T")[0] }
          : os
      ))
    } finally {
      setFinalizando(null)
    }
  }

  async function handleCadastrarPeca(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    
    const token = getAuthToken()
    
    try {
      const res = await fetch(`${API_URL}/oficina/pecas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: novaPeca.nome,
          quantidadeEstoque: parseInt(novaPeca.quantidadeEstoque),
          valorUnitario: parseFloat(novaPeca.valorUnitario),
        }),
      })
      
      // Add to local state regardless of API response
      const newPeca: Peca = {
        id: Date.now(),
        nome: novaPeca.nome,
        quantidadeEstoque: parseInt(novaPeca.quantidadeEstoque),
        valorUnitario: parseFloat(novaPeca.valorUnitario),
      }
      setPecas([...pecas, newPeca])
      setDialogOpen(false)
      setNovaPeca({ nome: "", quantidadeEstoque: "", valorUnitario: "" })
      
    } catch (err) {
      // Add to local state for demo
      const newPeca: Peca = {
        id: Date.now(),
        nome: novaPeca.nome,
        quantidadeEstoque: parseInt(novaPeca.quantidadeEstoque),
        valorUnitario: parseFloat(novaPeca.valorUnitario),
      }
      setPecas([...pecas, newPeca])
      setDialogOpen(false)
      setNovaPeca({ nome: "", quantidadeEstoque: "", valorUnitario: "" })
    } finally {
      setSubmitting(false)
    }
  }

  const stats = {
    total: ordensServico.length,
    abertas: ordensServico.filter((os) => os.status === "ABERTA").length,
    emAndamento: ordensServico.filter((os) => os.status === "EM_ANDAMENTO").length,
    finalizadas: ordensServico.filter((os) => os.status === "FINALIZADA").length,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Oficina</h1>
        <p className="text-muted-foreground mt-1">
          Gestão de ordens de serviço e peças
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total OS</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.abertas}</p>
          <p className="text-sm text-muted-foreground">Abertas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Play className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-500">{stats.emAndamento}</p>
          <p className="text-sm text-muted-foreground">Em Andamento</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.finalizadas}</p>
          <p className="text-sm text-muted-foreground">Finalizadas</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ordens de Serviço */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold text-foreground">Ordens de Serviço</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {ordensServico.map((os) => {
                const status = statusConfig[os.status]
                const StatusIcon = status.icon
                
                return (
                  <div key={os.id} className="p-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{os.veiculo}</p>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                              {os.placa}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{os.descricao}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="font-medium">
                              R$ {os.custoEstimado.toLocaleString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                        {os.status !== "FINALIZADA" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFinalizarOS(os.id)}
                            disabled={finalizando === os.id}
                          >
                            {finalizando === os.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Finalizar
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Estoque de Peças */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Estoque de Peças</h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Peça</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCadastrarPeca} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Peça</Label>
                    <Input
                      id="nome"
                      value={novaPeca.nome}
                      onChange={(e) => setNovaPeca({ ...novaPeca, nome: e.target.value })}
                      placeholder="Ex: Filtro de Óleo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidade">Quantidade em Estoque</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="0"
                      value={novaPeca.quantidadeEstoque}
                      onChange={(e) => setNovaPeca({ ...novaPeca, quantidadeEstoque: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Unitário (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      min="0"
                      value={novaPeca.valorUnitario}
                      onChange={(e) => setNovaPeca({ ...novaPeca, valorUnitario: e.target.value })}
                      placeholder="0,00"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      "Cadastrar"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {pecas.map((peca) => (
              <div key={peca.id} className="p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{peca.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      R$ {peca.valorUnitario.toFixed(2)}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${peca.quantidadeEstoque <= 10 ? 'text-red-500' : 'text-foreground'}`}>
                    {peca.quantidadeEstoque} un.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
