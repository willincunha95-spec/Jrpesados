"use client"

import { useState, useEffect } from "react"
import { Wrench, Calendar, Loader2, Truck, CheckCircle, Clock, AlertTriangle, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOrdensServico, finalizarOrdemServico, type OrdemServico } from "@/lib/api"

// Mock data for when API is not available
const mockOrdensServico: OrdemServico[] = [
  { id: 1, veiculo: "Caminhão Munck ABC-1234", descricao: "Troca de óleo e filtros", tipo: "PREVENTIVA", dataAbertura: "2024-01-15", dataPrevisao: "2024-01-16", status: "EM_ANDAMENTO", custo: 850 },
  { id: 2, veiculo: "Guincho XYZ-5678", descricao: "Reparo no sistema hidráulico", tipo: "CORRETIVA", dataAbertura: "2024-01-14", dataPrevisao: "2024-01-18", status: "ABERTA", custo: 3200 },
  { id: 3, veiculo: "Empilhadeira EMP-001", descricao: "Revisão geral 5000h", tipo: "REVISAO", dataAbertura: "2024-01-12", dataPrevisao: "2024-01-15", status: "FINALIZADA", custo: 1500 },
  { id: 4, veiculo: "Caminhão Munck DEF-9012", descricao: "Troca de pneus", tipo: "PREVENTIVA", dataAbertura: "2024-01-10", dataPrevisao: "2024-01-11", status: "FINALIZADA", custo: 4800 },
  { id: 5, veiculo: "Guindaste GT-001", descricao: "Calibração de sensores", tipo: "PREVENTIVA", dataAbertura: "2024-01-16", dataPrevisao: "2024-01-17", status: "ABERTA", custo: 650 },
  { id: 6, veiculo: "Plataforma PE-001", descricao: "Reparo no motor elétrico", tipo: "CORRETIVA", dataAbertura: "2024-01-08", dataPrevisao: "2024-01-12", status: "EM_ANDAMENTO", custo: 2100 },
]

const statusConfig = {
  ABERTA: { label: "Aberta", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock },
  EM_ANDAMENTO: { label: "Em Andamento", className: "bg-primary/10 text-primary border-primary/20", icon: Wrench },
  FINALIZADA: { label: "Finalizada", className: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle },
}

const tipoConfig = {
  PREVENTIVA: { label: "Preventiva", className: "bg-green-500/10 text-green-600" },
  CORRETIVA: { label: "Corretiva", className: "bg-red-500/10 text-red-600" },
  REVISAO: { label: "Revisão", className: "bg-blue-500/10 text-blue-600" },
}

export default function OficinaPage() {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>(mockOrdensServico)
  const [loading, setLoading] = useState(true)
  const [finalizando, setFinalizando] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "ABERTA" | "EM_ANDAMENTO" | "FINALIZADA">("all")

  useEffect(() => {
    async function fetchOrdensServico() {
      try {
        const data = await getOrdensServico()
        if (data.length > 0) {
          setOrdensServico(data)
        }
      } catch (err) {
        console.log("Using mock data - API not available")
      } finally {
        setLoading(false)
      }
    }
    fetchOrdensServico()
  }, [])

  const handleFinalizar = async (id: number) => {
    setFinalizando(id)
    try {
      await finalizarOrdemServico(id)
      setOrdensServico(prev =>
        prev.map(os => os.id === id ? { ...os, status: "FINALIZADA" as const } : os)
      )
    } catch (err) {
      // Update locally for demo
      setOrdensServico(prev =>
        prev.map(os => os.id === id ? { ...os, status: "FINALIZADA" as const } : os)
      )
    } finally {
      setFinalizando(null)
    }
  }

  const filteredOS = ordensServico.filter((os) => {
    if (filter === "all") return true
    return os.status === filter
  })

  const totalAbertas = ordensServico.filter(os => os.status === "ABERTA" || os.status === "EM_ANDAMENTO").length
  const custoTotal = ordensServico
    .filter(os => os.status !== "FINALIZADA")
    .reduce((acc, os) => acc + os.custo, 0)

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
        <h1 className="text-2xl font-display font-bold text-foreground">Oficina</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as ordens de serviço da frota
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            {totalAbertas > 0 && (
              <Badge variant="destructive">{totalAbertas} pendentes</Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{ordensServico.length}</p>
          <p className="text-sm text-muted-foreground">Total de Ordens</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalAbertas}</p>
          <p className="text-sm text-muted-foreground">OS em Aberto</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {custoTotal.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Custo Pendente</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>
        <Button
          variant={filter === "ABERTA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("ABERTA")}
        >
          Abertas
        </Button>
        <Button
          variant={filter === "EM_ANDAMENTO" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("EM_ANDAMENTO")}
        >
          Em Andamento
        </Button>
        <Button
          variant={filter === "FINALIZADA" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("FINALIZADA")}
        >
          Finalizadas
        </Button>
      </div>

      {/* Ordens de serviço list */}
      <div className="grid gap-4">
        {filteredOS.map((os) => {
          const status = statusConfig[os.status]
          const tipo = tipoConfig[os.tipo]
          const StatusIcon = status.icon

          return (
            <div key={os.id} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{os.veiculo}</h3>
                      <Badge variant="outline" className={status.className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                      <Badge className={tipo.className}>
                        {tipo.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{os.descricao}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Abertura: </span>
                      <span className="text-foreground">
                        {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Previsão: </span>
                      <span className="text-foreground">
                        {new Date(os.dataPrevisao).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      R$ {os.custo.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-xs text-muted-foreground">custo estimado</p>
                  </div>
                  {os.status !== "FINALIZADA" && (
                    <Button
                      size="sm"
                      onClick={() => handleFinalizar(os.id)}
                      disabled={finalizando === os.id}
                    >
                      {finalizando === os.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Finalizando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Finalizar OS
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
    </div>
  )
}
