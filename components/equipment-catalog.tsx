"use client"

import { useState, useEffect } from "react"
import { Truck, Wrench, Package, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Equipamento } from "@/lib/api"

const mockEquipamentos: Equipamento[] = [
  {
    id: 1,
    nome: "Caminhão Munck 15t",
    marca: "Mercedes-Benz",
    modelo: "Atego 2426",
    numeroSerie: "MK-001",
    valorDiaria: 1500,
    status: "DISPONIVEL",
  },
  {
    id: 2,
    nome: "Caminhão Munck 25t",
    marca: "Scania",
    modelo: "P310",
    numeroSerie: "MK-002",
    valorDiaria: 2200,
    status: "DISPONIVEL",
  },
  {
    id: 3,
    nome: "Empilhadeira 3t",
    marca: "Hyster",
    modelo: "H60FT",
    numeroSerie: "EMP-001",
    valorDiaria: 800,
    status: "LOCADO",
  },
  {
    id: 4,
    nome: "Guindaste Telescópico",
    marca: "Liebherr",
    modelo: "LTM 1060",
    numeroSerie: "GT-001",
    valorDiaria: 3500,
    status: "DISPONIVEL",
  },
  {
    id: 5,
    nome: "Guincho Pesado",
    marca: "Volvo",
    modelo: "FH 540",
    numeroSerie: "GP-001",
    valorDiaria: 1800,
    status: "MANUTENCAO",
  },
  {
    id: 6,
    nome: "Plataforma Elevatória",
    marca: "JLG",
    modelo: "860SJ",
    numeroSerie: "PE-001",
    valorDiaria: 950,
    status: "DISPONIVEL",
  },
]

const statusConfig = {
  DISPONIVEL: { label: "Disponível", color: "bg-accent text-accent-foreground" },
  LOCADO: { label: "Locado", color: "bg-muted text-muted-foreground" },
  MANUTENCAO: { label: "Manutenção", color: "bg-destructive/10 text-destructive" },
}

const getEquipmentIcon = (nome: string) => {
  if (nome.toLowerCase().includes("caminhão") || nome.toLowerCase().includes("munck")) {
    return Truck
  }
  if (nome.toLowerCase().includes("guinch") || nome.toLowerCase().includes("guind")) {
    return Package
  }
  return Wrench
}

export function EquipmentCatalog() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>(mockEquipamentos)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchEquipamentos() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
        const res = await fetch(`${API_URL}/equipamentos/catalogo`)
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setEquipamentos(data)
          }
        }
      } catch (error) {
        console.log("Using mock data - API not available")
      } finally {
        setLoading(false)
      }
    }

    fetchEquipamentos()
  }, [])

  const filteredEquipamentos = equipamentos.filter((eq) => {
    if (filter === "all") return true
    return eq.status === filter
  })

  const filters = [
    { value: "all", label: "Todos" },
    { value: "DISPONIVEL", label: "Disponíveis" },
    { value: "LOCADO", label: "Locados" },
  ]

  return (
    <section id="equipamentos" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Catálogo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4">
              Equipamentos para <span className="italic">Locação</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Confira nossa frota completa, todos em perfeito estado de conservação.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  filter === f.value
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipamentos.map((equipamento) => {
              const Icon = getEquipmentIcon(equipamento.nome)
              const status = statusConfig[equipamento.status]

              return (
                <div
                  key={equipamento.id}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all hover:shadow-lg"
                >
                  {/* Image area */}
                  <div className="h-52 bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative">
                    <Icon className="h-16 w-16 text-muted-foreground/30 group-hover:text-accent/40 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {equipamento.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {equipamento.marca} {equipamento.modelo}
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Diária</p>
                        <p className="text-2xl font-display text-foreground">
                          R$ {equipamento.valorDiaria.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <a href="#cotacao">
                        <Button 
                          size="sm" 
                          variant={equipamento.status === "DISPONIVEL" ? "default" : "outline"}
                          disabled={equipamento.status !== "DISPONIVEL"}
                          className="rounded-full gap-1 group/btn"
                        >
                          {equipamento.status === "DISPONIVEL" ? (
                            <>
                              Solicitar
                              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </>
                          ) : (
                            "Indisponível"
                          )}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
