"use client"

import { useState, useEffect } from "react"
import { Package, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"
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

interface Equipamento {
  id: number
  nome: string
  marca: string
  modelo: string
  numeroSerie: string
  valorDiaria: number
  status: string
  imageUrl?: string
}

const statusConfig = {
  DISPONIVEL: { label: "Disponível", variant: "default" as const },
  LOCADO: { label: "Locado", variant: "secondary" as const },
  MANUTENCAO: { label: "Manutenção", variant: "destructive" as const },
}

export default function EquipamentosAdminPage() {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("all")
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    valorDiaria: "",
    status: "DISPONIVEL",
    imageUrl: ""
  })

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchEquipamentos = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/equipamentos`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setEquipamentos(data)
      }
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipamentos()
  }, [])

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`${API_URL}/equipamentos/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      if (res.ok) {
        return await res.text();
      }
      
      const errorText = await res.text();
      console.error(`Erro no upload (${res.status}):`, errorText);
      throw new Error(errorText || "Erro no upload");
    } catch (error) {
      console.error("Erro upload:", error);
      alert("Falha no upload da imagem: " + (error instanceof Error ? error.message : "Erro desconhecido"));
      return null;
    }
  }

  const handleEdit = (eq: Equipamento) => {
    setEditingId(eq.id)
    setFormData({
      nome: eq.nome || "",
      marca: eq.marca || "",
      modelo: eq.modelo || "",
      numeroSerie: eq.numeroSerie || "",
      valorDiaria: eq.valorDiaria ? eq.valorDiaria.toString() : "",
      status: eq.status || "DISPONIVEL",
      imageUrl: eq.imageUrl || ""
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      let imageUrl = formData.imageUrl

      if (selectedFile) {
        const uploadedUrl = await handleFileUpload(selectedFile)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const payload = {
        ...(editingId ? { id: editingId } : {}),
        ...formData,
        imageUrl,
        valorDiaria: parseFloat(formData.valorDiaria)
      }

      const res = await fetch(`${API_URL}/equipamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData({
          nome: "", marca: "", modelo: "", numeroSerie: "", valorDiaria: "", status: "DISPONIVEL", imageUrl: ""
        })
        setSelectedFile(null)
        fetchEquipamentos()
      } else {
        const status = res.status;
        const errorText = await res.text();
        console.error(`Erro ${status}:`, errorText);
        alert(`Erro ao salvar equipamento (${status}): ` + (errorText || res.statusText));
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro de conexão ao salvar: " + (error instanceof Error ? error.message : String(error)));
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este equipamento?")) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/equipamentos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.ok) {
        fetchEquipamentos()
      } else {
        alert("Erro ao remover equipamento.")
      }
    } catch (error) {
      console.error("Erro ao remover:", error)
    }
  }

  const filteredEquipamentos = equipamentos.filter((eq) => {
    if (filter === "all") return true
    return eq.status === filter
  })

  const totalDisponivel = equipamentos.filter(e => e.status === "DISPONIVEL").length
  const totalLocado = equipamentos.filter(e => e.status === "LOCADO").length
  const totalManutencao = equipamentos.filter(e => e.status === "MANUTENCAO").length

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
          <p className="text-2xl font-bold text-foreground">{equipamentos.length}</p>
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
          <h3 className="font-semibold text-foreground mb-4">
            {editingId ? "Editar Equipamento" : "Cadastrar Novo Equipamento"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input 
                placeholder="Ex: Caminhão Munck 15t" 
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input 
                placeholder="Ex: Mercedes-Benz" 
                value={formData.marca}
                onChange={(e) => setFormData({...formData, marca: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input 
                placeholder="Ex: Atego 2426" 
                value={formData.modelo}
                onChange={(e) => setFormData({...formData, modelo: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Número de Série</Label>
              <Input 
                placeholder="Ex: MK-001" 
                value={formData.numeroSerie}
                onChange={(e) => setFormData({...formData, numeroSerie: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Valor Diária (R$)</Label>
              <Input 
                type="number" 
                placeholder="1500" 
                value={formData.valorDiaria}
                onChange={(e) => setFormData({...formData, valorDiaria: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
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
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label>Foto do Equipamento</Label>
              <div className="flex gap-4 items-center">
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="bg-card"
                />
                {formData.imageUrl && !selectedFile && (
                  <p className="text-xs text-muted-foreground">Foto atual: {formData.imageUrl}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={handleSave}>Salvar Equipamento</Button>
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
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando equipamentos...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Foto</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Equipamento</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Série</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Valor/Dia</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEquipamentos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhum equipamento cadastrado.
                  </td>
                </tr>
              ) : (
                filteredEquipamentos.map((eq) => {
                  const status = statusConfig[eq.status as keyof typeof statusConfig] || statusConfig.DISPONIVEL
                  
                  return (
                    <tr key={eq.id} className="hover:bg-secondary/20">
                      <td className="p-4">
                        {eq.imageUrl ? (
                          <div className="w-16 h-12 rounded bg-muted overflow-hidden">
                            <img 
                              src={eq.imageUrl.startsWith("http") ? eq.imageUrl : `${API_URL}${eq.imageUrl.startsWith("/") ? "" : "/"}${eq.imageUrl}`} 
                              alt={eq.nome} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-12 rounded bg-secondary/50 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
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
                          R$ {eq.valorDiaria?.toLocaleString("pt-BR") || "0"}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(eq)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(eq.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
