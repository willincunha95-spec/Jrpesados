"use client"

import { useState, useEffect } from "react"
import { MapPin, Truck, Clock, Video, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Rastreio {
  id: number
  placa: string
  modelo: string
  latitude: number
  longitude: number
  origem: string
  destino: string
  statusCarga: string
  previsaoChegada: string
}

export default function RastreioPage() {
  const [rastreios, setRastreios] = useState<Rastreio[]>([])
  const [selectedRastreio, setSelectedRastreio] = useState<Rastreio | null>(null)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"

  useEffect(() => {
    const fetchRastreios = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/veiculos/meus-rastreios`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setRastreios(data)
          if (data.length > 0) setSelectedRastreio(data[0])
        }
      } catch (error) {
        console.error("Erro fetch rastreio:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRastreios()
  }, [])

  if (loading) return <div className="p-8 text-center text-muted-foreground">Carregando rastreio...</div>

  if (rastreios.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl">
        <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground">Nenhuma carga em rastreio</h2>
        <p className="text-muted-foreground">Você não possui veículos vinculados a locações ativas no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Rastreio de Cargas</h1>
        <p className="text-muted-foreground mt-1">Acompanhe suas cargas em tempo real</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de rastreios */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Cargas Ativas</h2>
          {rastreios.map((rastreio) => (
            <button
              key={rastreio.id}
              onClick={() => setSelectedRastreio(rastreio)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedRastreio?.id === rastreio.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{rastreio.placa}</p>
                    <p className="text-xs text-muted-foreground">{rastreio.modelo}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500`}>
                  {rastreio.statusCarga}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{rastreio.origem || "Não informada"}</p>
                <p className="text-primary font-medium">{rastreio.destino || "Não informado"}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Mapa placeholder */}
        {selectedRastreio && (
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-[400px] w-full bg-secondary/20 relative">
                {selectedRastreio.latitude && selectedRastreio.longitude ? (
                  <iframe
                    title="Mapa Rastreamento"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedRastreio.longitude - 0.05},${selectedRastreio.latitude - 0.05},${selectedRastreio.longitude + 0.05},${selectedRastreio.latitude + 0.05}&layer=mapnik&marker=${selectedRastreio.latitude},${selectedRastreio.longitude}`}
                    className="absolute inset-0 z-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary to-secondary/50">
                    <MapPin className="h-12 w-12 mb-4 opacity-50" />
                    <p className="font-medium text-foreground">Aguardando sinal do GPS</p>
                    <p className="text-sm">O veículo ainda não reportou sua localização</p>
                  </div>
                )}
                
                {/* Floating Info Box OVER the map */}
                <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center">
                  <div className="px-4 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border shadow-lg flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Truck className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{selectedRastreio.placa}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {selectedRastreio.latitude ? "Sinal em tempo real" : "Aguardando sincronização"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rota</p>
                    <p className="font-medium text-foreground">{selectedRastreio.origem || "-"}</p>
                    <p className="text-sm text-primary">{selectedRastreio.destino || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previsão de Chegada</p>
                    <p className="font-medium text-foreground">{selectedRastreio.previsaoChegada || "A definir"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coordenadas</p>
                    <p className="font-medium text-foreground text-sm font-mono">
                      {selectedRastreio.latitude && selectedRastreio.longitude 
                        ? `${selectedRastreio.latitude.toFixed(5)}, ${selectedRastreio.longitude.toFixed(5)}`
                        : "Sinal Indisponível"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
