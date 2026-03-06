"use client"

import { useState } from "react"
import { Package, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const mockEquipamentos = [
  { id: 1, nome: "Caminhão Munck 15t", marca: "Mercedes-Benz", modelo: "Atego 2426", numeroSerie: "MK-001", valorDiaria: 1500, status: "DISPONIVEL" },
  { id: 2, nome: "Caminhão Munck 25t", marca: "Scania", modelo: "P310", numeroSerie: "MK-002", valorDiaria: 2200, status: "LOCADO" },
  { id: 3, nome: "Empilhadeira 3t", marca: "Hyster", modelo: "H60FT", numeroSerie: "EMP-001", valorDiaria: 800, status: "LOCADO" },
  { id: 4, nome: "Guindaste Telescópico", marca: "Liebherr", modelo: "LTM 1060", numeroSerie: "GT-001", valorDiaria: 3500, status: "DISPONIVEL" },
  { id: 5, nome: "Guincho Pesado", marca: "Volvo", modelo: "FH 540", numeroSerie: "GP-001", valorDiaria: 1800, status: "MANUTENCAO" },
  { id: 6, nome: "Plataforma Elevatória", marca: "JLG", modelo: "860SJ", numeroSerie: "PE-001", valorDiaria: 950, status: "DISPONIVEL" },
]

const statusConfig = {
  DISPONIVEL: { label: "Disponível", variant: "default" as const },
  LOCADO: { label: "Locado", variant: "secondary" as const },
  MANUTENCAO: { label: "Manutenção", variant: "destructive" as const },
}

export default function EquipamentosAdminPage() {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("all")

  const filteredEquipamentos = mockEquipamentos.filter((eq) => {
    if (filter === "all") return true
    return eq.status === filter
  })

  const totalDisponivel = mockEquipamentos.filter(e => e.status === "DISPONIVEL").length
  const totalLocado = mockEquipamentos.filter(e => e.status === "LOCADO").length
  const totalManutencao = mockEquipamentos.filter(e => e.status === "MANUTENCAO").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Equipamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o catálogo de equipamentos para locação
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Equipamento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{mockEquipamentos.length}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-green-500">{totalDisponivel}</p>
          <p className="text-sm text-muted-foreground">Disponíveis</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-primary">{totalLocado}</p>
          <p className="text-sm text-muted-foreground">Locados</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-red-500">{totalManutencao}</p>
          <p className="text-sm text-muted-foreground">Manutenção</p>
        </div>
      </div>

      {/* New equipment form */}
      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold text-foreground mb-4">Cadastrar Novo Equipamento</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input placeholder="Ex: Caminhão Munck 15t" />
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input placeholder="Ex: Mercedes-Benz" />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input placeholder="Ex: Atego 2426" />
            </div>
            <div className="space-y-2">
              <Label>Número de Série</Label>
              <Input placeholder="Ex: MK-001" />
            </div>
            <div className="space-y-2">
              <Label>Valor Diária (R$)</Label>
              <Input type="number" placeholder="1500" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                  <SelectItem value="LOCADO">Locado</SelectItem>
                  <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Salvar Equipamento</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={filter === "DISPONIVEL" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("DISPONIVEL")}
        >
          Disponíveis
        </Button>
        <Button
          variant={filter === "LOCADO" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("LOCADO")}
        >
          Locados
        </Button>
        <Button
          variant={filter === "MANUTENCAO" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("MANUTENCAO")}
        >
          Manutenção
        </Button>
      </div>

      {/* Equipment table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Equipamento</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Série</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor/Dia</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEquipamentos.map((eq) => {
              const status = statusConfig[eq.status as keyof typeof statusConfig]
              
              return (
                <tr key={eq.id} className="hover:bg-secondary/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{eq.nome}</p>
                        <p className="text-sm text-muted-foreground">{eq.marca} - {eq.modelo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">
                    {eq.numeroSerie}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-primary">
                      R$ {eq.valorDiaria.toLocaleString("pt-BR")}
                    </p>
                  </td>
                  <td className="p-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
