"use client"

import { useState } from "react"
import { Truck, MapPin, Clock, Edit, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const mockVeiculos = [
  {
    id: 1,
    placa: "ABC-1234",
    tipo: "Caminhão Munck 15t",
    motorista: "João Silva",
    status: "EM_ROTA",
    origem: "São Paulo, SP",
    destino: "Campinas, SP",
    previsao: "Hoje, 18:00",
    cliente: "Construtora ABC",
  },
  {
    id: 2,
    placa: "XYZ-5678",
    tipo: "Caminhão Munck 25t",
    motorista: "Carlos Santos",
    status: "CARREGANDO",
    origem: "Santos, SP",
    destino: "São Paulo, SP",
    previsao: "Amanhã, 10:00",
    cliente: "Indústria XYZ",
  },
  {
    id: 3,
    placa: "DEF-9012",
    tipo: "Guincho Pesado",
    motorista: "Pedro Lima",
    status: "EM_ROTA",
    origem: "São Paulo, SP",
    destino: "Guarulhos, SP",
    previsao: "Hoje, 20:30",
    cliente: "Logística Beta",
  },
  {
    id: 4,
    placa: "GHI-3456",
    tipo: "Caminhão Munck 15t",
    motorista: "Roberto Carlos",
    status: "DISPONIVEL",
    origem: "-",
    destino: "-",
    previsao: "-",
    cliente: "-",
  },
  {
    id: 5,
    placa: "JKL-7890",
    tipo: "Plataforma",
    motorista: "-",
    status: "MANUTENCAO",
    origem: "-",
    destino: "-",
    previsao: "Previsão: 3 dias",
    cliente: "-",
  },
]

const statusConfig = {
  EM_ROTA: { label: "Em Rota", color: "bg-green-500", textColor: "text-green-500" },
  CARREGANDO: { label: "Carregando", color: "bg-blue-500", textColor: "text-blue-500" },
  DISPONIVEL: { label: "Disponível", color: "bg-primary", textColor: "text-primary" },
  MANUTENCAO: { label: "Manutenção", color: "bg-red-500", textColor: "text-red-500" },
}

const statusOptions = [
  { value: "COLETADO", label: "Coletado" },
  { value: "EM_ROTA", label: "Em Rota" },
  { value: "ENTREGUE", label: "Entregue" },
  { value: "PROBLEMA", label: "Problema" },
]

export default function FrotaPage() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [previsao, setPrevisao] = useState("")

  const handleUpdateStatus = (id: number) => {
    // Here you would call the API: PATCH /veiculos/{id}/status
    console.log("Updating status:", { id, status: selectedStatus, previsao })
    setEditingId(null)
    setSelectedStatus("")
    setPrevisao("")
  }

  const veiculosEmRota = mockVeiculos.filter(v => v.status === "EM_ROTA" || v.status === "CARREGANDO")
  const veiculosDisponiveis = mockVeiculos.filter(v => v.status === "DISPONIVEL")
  const veiculosManutencao = mockVeiculos.filter(v => v.status === "MANUTENCAO")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Gestão de Frota</h1>
          <p className="text-muted-foreground mt-1">
            Controle e atualize o status dos veículos
          </p>
        </div>
        <Button>
          <Truck className="h-4 w-4 mr-2" />
          Novo Veículo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{mockVeiculos.length}</p>
          <p className="text-sm text-muted-foreground">Total na Frota</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-green-500">{veiculosEmRota.length}</p>
          <p className="text-sm text-muted-foreground">Em Rota</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-primary">{veiculosDisponiveis.length}</p>
          <p className="text-sm text-muted-foreground">Disponíveis</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-red-500">{veiculosManutencao.length}</p>
          <p className="text-sm text-muted-foreground">Manutenção</p>
        </div>
      </div>

      {/* Vehicles table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Veículo</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Motorista</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Rota</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockVeiculos.map((veiculo) => {
              const status = statusConfig[veiculo.status as keyof typeof statusConfig]
              const isEditing = editingId === veiculo.id

              return (
                <tr key={veiculo.id} className="hover:bg-secondary/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{veiculo.placa}</p>
                        <p className="text-sm text-muted-foreground">{veiculo.tipo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground hidden md:table-cell">
                    {veiculo.motorista}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {veiculo.origem !== "-" ? (
                      <div className="text-sm">
                        <p className="text-foreground">{veiculo.origem}</p>
                        <p className="text-primary">{veiculo.destino}</p>
                        <p className="text-xs text-muted-foreground">{veiculo.previsao}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.textColor} bg-current/10`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Previsão"
                          value={previsao}
                          onChange={(e) => setPrevisao(e.target.value)}
                          className="w-32"
                        />
                        <Button size="sm" onClick={() => handleUpdateStatus(veiculo.id)}>
                          Salvar
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(veiculo.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Atualizar
                      </Button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
