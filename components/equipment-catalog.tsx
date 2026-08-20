"use client"

import { useState, useEffect } from "react"
import { Truck, Wrench, Package, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Equipamento } from "@/lib/api"

// Empty state for production - waiting for real data from the API
const mockEquipamentos: Equipamento[] = []

const statusConfig = {
  DISPONIVEL: { label: "Disponível", variant: "default" as const, color: "bg-green-500" },
  LOCADO: { label: "Locado", variant: "secondary" as const, color: "bg-primary" },
  MANUTENCAO: { label: "Manutenção", variant: "destructive" as const, color: "bg-red-500" },
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"
        const res = await fetch(`${API_URL}/equipamentos/catalogo`)
        if (res.ok) {
          const data = await res.json()
          setEquipamentos(data)
        }
      } catch (error) {
        console.error("Erro fetch catalogo:", error)
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

  return (
    <section id="equipamentos" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Nosso Catálogo
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Equipamentos para Locação
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira nossa frota completa de veículos e equipamentos disponíveis para locação. 
            Todos em perfeito estado de conservação e com manutenção em dia.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredEquipamentos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipamentos.map((equipamento) => {
              const Icon = getEquipmentIcon(equipamento.nome)
              const status = statusConfig[equipamento.status]

              return (
                <div
                  key={equipamento.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  {/* Image with icon fallback */}
                  <div className="h-48 bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center relative">
                    {equipamento.imageUrl ? (
                      <img 
                        src={equipamento.imageUrl.startsWith("http") ? equipamento.imageUrl : (process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br") + equipamento.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt={equipamento.nome} 
                      />
                    ) : (
                      <Icon className="h-20 w-20 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {equipamento.nome}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {equipamento.marca} - {equipamento.modelo}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Valor diária</p>
                        <p className="text-xl font-bold text-primary">
                          R$ {equipamento.valorDiaria.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <a href="#cotacao">
                        <Button 
                          size="sm" 
                          disabled={equipamento.status !== "DISPONIVEL"}
                        >
                          {equipamento.status === "DISPONIVEL" ? "Solicitar" : "Indisponível"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-card/50 rounded-2xl border border-dashed border-border animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum equipamento disponível</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              No momento não possuímos equipamentos disponíveis para locação. 
              Entre em contato conosco para verificar futuras disponibilidades.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => window.location.href='#cotacao'}>
              Falar com Consultor
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
