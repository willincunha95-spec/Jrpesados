"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText, 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Cotacao {
  id: string
  clienteNome: string
  email: string
  telefone: string
  tipoServico: string
  origem: string
  destino: string
  descricao: string
  status: "PENDENTE" | "EM_ANALISE" | "APROVADA" | "RECUSADA"
  dataCriacao: string
  valorEstimado?: number
}

const mockCotacoes: Cotacao[] = [
  {
    id: "COT-001",
    clienteNome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-1111",
    tipoServico: "Transporte de Container",
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    descricao: "Container de 20 pés com equipamentos industriais",
    status: "PENDENTE",
    dataCriacao: "2024-01-15",
  },
  {
    id: "COT-002",
    clienteNome: "Maria Santos",
    email: "maria@empresa.com",
    telefone: "(11) 88888-2222",
    tipoServico: "Locação de Munck",
    origem: "Campinas, SP",
    destino: "Campinas, SP",
    descricao: "Necessário munck de 15 toneladas para içamento de máquina",
    status: "EM_ANALISE",
    dataCriacao: "2024-01-14",
    valorEstimado: 3500,
  },
  {
    id: "COT-003",
    clienteNome: "Pedro Costa",
    email: "pedro@industria.com",
    telefone: "(19) 77777-3333",
    tipoServico: "Remoção Industrial",
    origem: "Sorocaba, SP",
    destino: "Jundiaí, SP",
    descricao: "Remoção de 3 máquinas CNC pesadas",
    status: "APROVADA",
    dataCriacao: "2024-01-13",
    valorEstimado: 12000,
  },
  {
    id: "COT-004",
    clienteNome: "Ana Oliveira",
    email: "ana@logistica.com",
    telefone: "(11) 66666-4444",
    tipoServico: "Transporte Especial",
    origem: "Santos, SP",
    destino: "Belo Horizonte, MG",
    descricao: "Carga indivisível - estrutura metálica de 18 metros",
    status: "RECUSADA",
    dataCriacao: "2024-01-12",
  },
]

const statusColors = {
  PENDENTE: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  EM_ANALISE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  APROVADA: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  RECUSADA: "bg-red-500/20 text-red-400 border-red-500/30",
}

const statusLabels = {
  PENDENTE: "Pendente",
  EM_ANALISE: "Em Análise",
  APROVADA: "Aprovada",
  RECUSADA: "Recusada",
}

export default function CotacoesPage() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCotacao, setSelectedCotacao] = useState<Cotacao | null>(null)

  useEffect(() => {
    fetchCotacoes()
  }, [])

  const fetchCotacoes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://api.jrpesadostransportes.com.br/leads", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        const mappedData = data.map((d: any) => ({
          id: `COT-${d.id}`,
          clienteNome: d.nome,
          email: d.empresa || "Não informado", 
          telefone: d.telefone,
          tipoServico: d.tipoServico,
          origem: "N/A",
          destino: "N/A",
          descricao: d.mensagem || "Sem mensagem",
          status: d.status || "PENDENTE",
          dataCriacao: d.dataSolicitacao
        }))
        setCotacoes(mappedData)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCotacoes = cotacoes.filter((cotacao) => {
    const matchesSearch = 
      cotacao.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cotacao.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || cotacao.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // We are visually hiding the status update for now since the backend doesn't have an endpoint for it yet.
  const handleStatusChange = (cotacaoId: string, newStatus: Cotacao["status"]) => {
    setCotacoes(prev => 
      prev.map(c => c.id === cotacaoId ? { ...c, status: newStatus } : c)
    )
    setSelectedCotacao(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cotações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie solicitações de orçamento dos clientes
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Pendentes", value: cotacoes.filter(c => c.status === "PENDENTE").length, icon: Clock, color: "text-amber-400" },
          { label: "Em Análise", value: cotacoes.filter(c => c.status === "EM_ANALISE").length, icon: FileText, color: "text-blue-400" },
          { label: "Aprovadas", value: cotacoes.filter(c => c.status === "APROVADA").length, icon: CheckCircle, color: "text-emerald-400" },
          { label: "Recusadas", value: cotacoes.filter(c => c.status === "RECUSADA").length, icon: XCircle, color: "text-red-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PENDENTE">Pendentes</SelectItem>
            <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
            <SelectItem value="APROVADA">Aprovadas</SelectItem>
            <SelectItem value="RECUSADA">Recusadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Cotações */}
      <div className="space-y-4">
        {filteredCotacoes.map((cotacao) => (
          <div
            key={cotacao.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm text-muted-foreground">{cotacao.id}</span>
                  <Badge className={statusColors[cotacao.status]}>
                    {statusLabels[cotacao.status]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(cotacao.dataCriacao).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">{cotacao.clienteNome}</h3>
                  <p className="text-primary font-medium">{cotacao.tipoServico}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {cotacao.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {cotacao.telefone}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{cotacao.origem}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground">{cotacao.destino}</span>
                </div>

                <p className="text-sm text-muted-foreground">{cotacao.descricao}</p>

                {cotacao.valorEstimado && (
                  <p className="text-lg font-bold text-primary">
                    Valor Estimado: R$ {cotacao.valorEstimado.toLocaleString("pt-BR")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCotacao(cotacao)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detalhes
                </Button>
                {cotacao.status === "PENDENTE" && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(cotacao.id, "EM_ANALISE")}
                  >
                    Analisar
                  </Button>
                )}
                {cotacao.status === "EM_ANALISE" && (
                  <>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleStatusChange(cotacao.id, "APROVADA")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(cotacao.id, "RECUSADA")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Recusar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredCotacoes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma cotação encontrada</p>
          </div>
        )}
      </div>

      {/* Detalhes Modal */}
      <Dialog open={!!selectedCotacao} onOpenChange={(open) => !open && setSelectedCotacao(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Cotação</DialogTitle>
          </DialogHeader>
          {selectedCotacao && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-3 border-b pb-4">
                <Badge className={statusColors[selectedCotacao.status]}>
                  {statusLabels[selectedCotacao.status]}
                </Badge>
                <span className="font-mono text-sm text-muted-foreground">{selectedCotacao.id}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  {new Date(selectedCotacao.dataCriacao).toLocaleString("pt-BR")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente / Empresa</p>
                  <p className="text-base font-semibold">{selectedCotacao.clienteNome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Serviço Solicitado</p>
                  <p className="text-base text-primary font-medium">{selectedCotacao.tipoServico}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Empresa informada (E-mail p/ Log)</p>
                  <p className="text-sm flex items-center gap-2 text-foreground">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {selectedCotacao.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <p className="text-sm flex items-center gap-2 text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {selectedCotacao.telefone}
                  </p>
                </div>
              </div>

              <div className="bg-secondary/20 p-4 rounded-xl border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-3">Mensagem do Cliente:</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{selectedCotacao.descricao}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
