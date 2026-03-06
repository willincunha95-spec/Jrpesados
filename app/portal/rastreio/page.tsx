"use client"

import { useState } from "react"
import { MapPin, Truck, Clock, Video, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for demo
const mockRastreios = [
  {
    id: 1,
    placa: "ABC-1234",
    motorista: "João Silva",
    origem: "São Paulo, SP",
    destino: "Campinas, SP",
    status: "Em Trânsito",
    latitude: -23.5505,
    longitude: -46.6333,
    ultimaAtualizacao: "Há 5 minutos",
    previsaoChegada: "Hoje, 18:00",
    distanciaRestante: "45 km",
    tempoRestante: "50 min",
    urlVideo: null,
  },
  {
    id: 2,
    placa: "XYZ-5678",
    motorista: "Carlos Santos",
    origem: "Santos, SP",
    destino: "São Paulo, SP",
    status: "Carregando",
    latitude: -23.9608,
    longitude: -46.3336,
    ultimaAtualizacao: "Há 15 minutos",
    previsaoChegada: "Amanhã, 10:00",
    distanciaRestante: "72 km",
    tempoRestante: "1h 30min",
    urlVideo: "https://example.com/video",
  },
]

export default function RastreioPage() {
  const [selectedRastreio, setSelectedRastreio] = useState(mockRastreios[0])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Rastreio de Cargas</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe suas cargas em tempo real
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de rastreios */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Cargas Ativas</h2>
          {mockRastreios.map((rastreio) => (
            <button
              key={rastreio.id}
              onClick={() => setSelectedRastreio(rastreio)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedRastreio.id === rastreio.id
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
                    <p className="text-xs text-muted-foreground">{rastreio.motorista}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  rastreio.status === "Em Trânsito" 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-blue-500/10 text-blue-500"
                }`}>
                  {rastreio.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{rastreio.origem}</p>
                <p className="text-primary font-medium">{rastreio.destino}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Mapa placeholder */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map container */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="h-80 bg-gradient-to-br from-secondary to-secondary/50 relative flex items-center justify-center">
              {/* Placeholder map visualization */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Truck marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse">
                  <Truck className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="mt-4 px-4 py-2 bg-card rounded-lg border border-border shadow-lg">
                  <p className="text-sm font-medium text-foreground">{selectedRastreio.placa}</p>
                  <p className="text-xs text-muted-foreground">{selectedRastreio.ultimaAtualizacao}</p>
                </div>
              </div>

              {/* Route line indicator */}
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-background/50 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary rounded-full" />
              </div>
            </div>
          </div>

          {/* Details cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Navigation className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rota</p>
                  <p className="font-medium text-foreground">{selectedRastreio.origem}</p>
                  <p className="text-sm text-primary">{selectedRastreio.destino}</p>
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
                  <p className="font-medium text-foreground">{selectedRastreio.previsaoChegada}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedRastreio.distanciaRestante} - {selectedRastreio.tempoRestante}
                  </p>
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
                    {selectedRastreio.latitude.toFixed(4)}, {selectedRastreio.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Câmera da Carga</p>
                  {selectedRastreio.urlVideo ? (
                    <Button size="sm" variant="outline" className="mt-2">
                      Ver ao vivo
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">Não disponível</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
