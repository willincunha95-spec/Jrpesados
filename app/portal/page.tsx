"use client"

import { useState, useEffect } from "react"
import { Package, Truck, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demo
const mockEquipamentosAlugados = [
  { id: 1, nome: "Caminhão Munck 15t", modelo: "Mercedes Atego", status: "Ativo", dataFim: "15/04/2026" },
  { id: 2, nome: "Empilhadeira 3t", modelo: "Hyster H60FT", status: "Ativo", dataFim: "20/04/2026" },
]

const mockCargasEmTransito = [
  { 
    id: 1, 
    descricao: "Equipamento Industrial - São Paulo > Campinas", 
    status: "Em Trânsito",
    previsao: "Hoje, 18:00",
    progresso: 65
  },
  { 
    id: 2, 
    descricao: "Máquinas CNC - Santos > São Paulo", 
    status: "Carregando",
    previsao: "Amanhã, 10:00",
    progresso: 15
  },
]

export default function PortalDashboard() {
  const [equipamentos, setEquipamentos] = useState(mockEquipamentosAlugados)
  const [cargas, setCargas] = useState(mockCargasEmTransito)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao Portal do Cliente JR Pesados
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{equipamentos.length}</p>
              <p className="text-sm text-muted-foreground">Equipamentos Alugados</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{cargas.length}</p>
              <p className="text-sm text-muted-foreground">Cargas em Trânsito</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Rastreios Ativos</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Serviços Realizados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Equipamentos alugados */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Equipamentos Alugados</h2>
            <Link href="/portal/locacoes">
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {equipamentos.map((eq) => (
              <div key={eq.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{eq.nome}</p>
                    <p className="text-sm text-muted-foreground">{eq.modelo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                    {eq.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">Até {eq.dataFim}</p>
                </div>
              </div>
            ))}
            {equipamentos.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                Nenhum equipamento alugado no momento
              </div>
            )}
          </div>
        </div>

        {/* Cargas em trânsito */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Cargas em Trânsito</h2>
            <Link href="/portal/rastreio">
              <Button variant="ghost" size="sm">
                Rastrear
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {cargas.map((carga) => (
              <div key={carga.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{carga.descricao}</p>
                      <p className="text-xs text-muted-foreground">Previsão: {carga.previsao}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    carga.status === "Em Trânsito" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-blue-500/10 text-blue-500"
                  }`}>
                    {carga.status}
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${carga.progresso}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">{carga.progresso}% concluído</p>
              </div>
            ))}
            {cargas.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                Nenhuma carga em trânsito no momento
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
