"use client"

import { useState, useEffect } from "react"
import { Truck, MapPin, Clock, Edit, Plus, X, RefreshCw } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Veiculo {
  id: number
  placa: string
  modelo: string
  marca: string
  statusCarga: string
  origem: string
  destino: string
  previsaoChegada: string
  proprietarioId?: string
  latitude?: number
  longitude?: number
}

interface UserClient {
  id: string
  email: string
}

const statusConfig = {
  EM_TRANSITO: { label: "Em Rota", color: "bg-green-500", textColor: "text-green-500" },
  AGUARDANDO_COLETA: { label: "Aguardando", color: "bg-blue-500", textColor: "text-blue-500" },
  DISPONIVEL: { label: "Disponível", color: "bg-primary", textColor: "text-primary" },
  MANUTENCAO: { label: "Manutenção", color: "bg-red-500", textColor: "text-red-500" },
}

export default function FrotaPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [viewingCameraFor, setViewingCameraFor] = useState<string | null>(null)
  const [mapVehicle, setMapVehicle] = useState<Veiculo | null>(null)
  
  const [clientes, setClientes] = useState<UserClient[]>([])
  
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    marca: "",
    origem: "",
    destino: "",
    previsaoChegada: "",
    statusCarga: "AGUARDANDO_COLETA",
    proprietarioId: "" // Added
  })

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  const fetchVeiculos = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/veiculos`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setVeiculos(data)
      }
    } catch (error) {
      console.error("Erro fetch frota:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/users/clientes`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        setClientes(await res.json())
      }
    } catch (error) {
      console.error("Erro fetch clientes:", error)
    }
  }

  useEffect(() => {
    fetchVeiculos()
    fetchClientes()
  }, [])

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const url = editingId ? `${API_URL}/veiculos/${editingId}` : `${API_URL}/veiculos`
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setFormData({ placa: "", modelo: "", marca: "", origem: "", destino: "", previsaoChegada: "", statusCarga: "AGUARDANDO_COLETA", proprietarioId: "" })
        fetchVeiculos()
      } else {
        const status = res.status;
        const errorText = await res.text();
        console.error(`Erro ${status}:`, errorText);
        alert(`Erro ao salvar veículo (${status}): ` + (errorText || res.statusText));
      }
    } catch (error) {
      console.error("Erro save veiculo:", error);
      alert("Erro de conexão ao salvar veículo: " + (error instanceof Error ? error.message : String(error)));
    }
  }

  const handleEdit = (v: Veiculo) => {
    setEditingId(v.id)
    setFormData({
      placa: v.placa,
      modelo: v.modelo || "",
      marca: v.marca || "",
      origem: v.origem || "",
      destino: v.destino || "",
      previsaoChegada: v.previsaoChegada || "",
      statusCarga: v.statusCarga || "AGUARDANDO_COLETA",
      proprietarioId: v.proprietarioId || (v as any).proprietario?.id || ""
    })
    setShowForm(true)
  }

  const handleSyncSSX = async () => {
    setSyncing(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/tracking/sync`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        alert("Frota atualizada com sucesso a partir do rastreador!")
        fetchVeiculos()
      } else {
        const errorText = await res.text()
        alert("Falha ao sincronizar: " + errorText)
      }
    } catch (error) {
      alert("Erro de conexão ao sincronizar: " + error)
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Gestão de Frota</h1>
          <p className="text-muted-foreground mt-1">Controle e atualize sua frota de caminhões</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSyncSSX} disabled={syncing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            Sincronizar Rastreamento SSX
          </Button>
          <Button onClick={() => { setShowForm(true); setEditingId(null); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Veículo
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card relative">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-foreground mb-4">
            {editingId ? "Atualizar Veículo" : "Cadastrar Novo Veículo"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Placa</Label>
              <Input value={formData.placa} onChange={e => setFormData({...formData, placa: e.target.value})} placeholder="ABC-1234" />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} placeholder="Atego 2426" />
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} placeholder="Mercedes-Benz" />
            </div>
            <div className="space-y-2">
              <Label>Origem</Label>
              <Input value={formData.origem} onChange={e => setFormData({...formData, origem: e.target.value})} placeholder="Cidade, UF" />
            </div>
            <div className="space-y-2">
              <Label>Destino</Label>
              <Input value={formData.destino} onChange={e => setFormData({...formData, destino: e.target.value})} placeholder="Cidade, UF" />
            </div>
            <div className="space-y-2">
              <Label>Previsão</Label>
              <Input value={formData.previsaoChegada} onChange={e => setFormData({...formData, previsaoChegada: e.target.value})} placeholder="Ex: Hoje às 16h" />
            </div>
            <div className="space-y-2">
              <Label>Atribuir Cliente</Label>
              <Select value={formData.proprietarioId} onValueChange={(val) => setFormData({...formData, proprietarioId: val === "none" ? "" : val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {clientes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.email}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <Button onClick={handleSave}>{editingId ? "Atualizar" : "Salvar"}</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
            {editingId && (
              <Button variant="destructive" onClick={async () => {
                if (confirm("Tem certeza que deseja excluir este veículo?")) {
                  try {
                    const token = localStorage.getItem("token")
                    const res = await fetch(`${API_URL}/veiculos/${editingId}`, {
                      method: "DELETE",
                      headers: { "Authorization": `Bearer ${token}` }
                    })
                    if (res.ok) {
                      setShowForm(false)
                      setEditingId(null)
                      fetchVeiculos()
                    } else {
                      alert("Erro ao excluir veículo")
                    }
                  } catch (e) {
                    alert("Erro de conexão")
                  }
                }
              }}>Excluir Veículo</Button>
            )}
          </div>
        </div>
      )}

      {/* Vehicles table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando frota...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Veículo</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Rota</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {veiculos.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Nenhum veículo cadastrado.</td></tr>
              ) : (
                veiculos.map((v) => {
                  const status = statusConfig[v.statusCarga as keyof typeof statusConfig] || statusConfig.AGUARDANDO_COLETA
                  return (
                    <tr key={v.id} className="hover:bg-secondary/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{v.placa}</p>
                            <p className="text-sm text-muted-foreground">{v.modelo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        {v.origem ? (
                          <div className="text-sm">
                            <p className="text-foreground">{v.origem}</p>
                            <p className="text-primary">{v.destino}</p>
                            <p className="text-xs text-muted-foreground">{v.previsaoChegada}</p>
                          </div>
                        ) : <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.textColor} bg-current/10`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex flex-col items-end gap-1">
                            {v.latitude && v.longitude ? (
                              <Badge variant="outline" className="flex items-center gap-1 font-mono text-[10px] text-primary border-primary/20 bg-primary/5 px-2 py-0 border">
                                <MapPin className="h-3 w-3" />
                                GPS Ativo
                              </Badge>
                            ) : null}
                          </div>
                          <div className="flex justify-end gap-2">
                            {v.latitude && v.longitude && (
                              <Button size="sm" variant="outline" onClick={() => setMapVehicle(v)} className="text-primary border-primary/20 hover:bg-primary/5">
                                <MapPin className="h-4 w-4 mr-1" />
                                Ver Mapa
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(v)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Atualizar
                            </Button>
                          </div>
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

      {/* Map Modal */}
      <Dialog open={!!mapVehicle} onOpenChange={(open) => !open && setMapVehicle(null)}>
        <DialogContent className="max-w-4xl h-[600px] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Localização em Tempo Real: {mapVehicle?.placa}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-secondary/10 relative">
            {mapVehicle?.latitude && mapVehicle?.longitude ? (
              <iframe
                title="Mapa Rastreamento"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapVehicle.longitude - 0.01},${mapVehicle.latitude - 0.01},${mapVehicle.longitude + 0.01},${mapVehicle.latitude + 0.01}&layer=mapnik&marker=${mapVehicle.latitude},${mapVehicle.longitude}`}
                className="absolute inset-0"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MapPin className="h-12 w-12 mb-2 opacity-20" />
                <p>Coordenadas não disponíveis</p>
              </div>
            )}
            
            {/* Floating Info */}
            <div className="absolute bottom-4 left-4 z-10 p-3 bg-card/90 backdrop-blur-md rounded-lg border border-border shadow-2xl">
              <p className="text-xs font-bold text-foreground">Placa: {mapVehicle?.placa}</p>
              <p className="text-[10px] text-muted-foreground">Lat: {mapVehicle?.latitude?.toFixed(5)}</p>
              <p className="text-[10px] text-muted-foreground">Long: {mapVehicle?.longitude?.toFixed(5)}</p>
              <p className="text-[10px] text-primary mt-1">Sinal SSX Ativo</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
