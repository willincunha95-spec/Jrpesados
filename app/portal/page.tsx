"use client"

import { useState, useEffect } from "react"
import { Package, Truck, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PortalDashboard() {
  const [equipamentos, setEquipamentos] = useState<any[]>([])
  const [cargas, setCargas] = useState<any[]>([])
  const [historicoCount, setHistoricoCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const headers = { "Authorization": `Bearer ${token}` }
        
        // Perfil and Locacoes
        const resPerfil = await fetch(`${API_URL}/veiculos/meu-perfil`, { headers })
        if (resPerfil.ok) {
          const data = await resPerfil.json()
          setEquipamentos(data.equipamentos || [])
        }

        // Tracking
        const resRastreio = await fetch(`${API_URL}/veiculos/meus-rastreios`, { headers })
        if (resRastreio.ok) {
          const data = await resRastreio.json()
          setCargas(data || [])
        }

        // Historico
        const resHist = await fetch(`${API_URL}/financeiro/meu-historico`, { headers })
        if (resHist.ok) {
          const data = await resHist.json()
          setHistoricoCount(data.length)
        }
      } catch (error) {
        console.error("Erro dashboard portal:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="p-8 text-center text-muted-foreground">Carregando dashboard...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo ao Portal do Cliente JR Pesados</p>
      </div>

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
              <p className="text-2xl font-bold text-foreground">{cargas.length}</p>
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
              <p className="text-2xl font-bold text-foreground">{historicoCount}</p>
              <p className="text-sm text-muted-foreground">Serviços Realizados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Equipamentos Alugados</h2>
            <Link href="/portal/locacoes">
              <Button variant="ghost" size="sm">Ver todos <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {equipamentos.map((eq: any) => (
              <div key={eq.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Package className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="font-medium text-foreground">{eq.nome}</p>
                    <p className="text-sm text-muted-foreground">{eq.marca}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Ativo</span>
                  <p className="text-xs text-muted-foreground mt-1">Até {eq.devolucaoPrevista || "-"}</p>
                </div>
              </div>
            ))}
            {equipamentos.length === 0 && <div className="p-8 text-center text-muted-foreground">Nenhum equipamento alugado no momento</div>}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Cargas em Trânsito</h2>
            <Link href="/portal/rastreio">
              <Button variant="ghost" size="sm">Rastrear <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {cargas.map((carga: any) => (
              <div key={carga.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Truck className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{carga.placa} - {carga.modelo}</p>
                      <p className="text-xs text-muted-foreground">Previsão: {carga.previsaoChegada || "A definir"}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">{carga.statusCarga}</span>
                </div>
              </div>
            ))}
            {cargas.length === 0 && <div className="p-8 text-center text-muted-foreground">Nenhuma carga em trânsito no momento</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
