"use client"

import { DollarSign, Truck, Package, Users, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    faturamentoMensal: 0,
    totalVeiculos: 0,
    veiculosEmRota: 0,
    locacoesAtivas: 0,
    candidatosPendentes: 0
  })
  const [veiculosEmRota, setVeiculosEmRota] = useState<any[]>([])
  const [ultimosServicos, setUltimosServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const [dashRes, veicRes, finRes] = await Promise.all([
          fetch(`${API_URL}/veiculos/admin/dashboard`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_URL}/veiculos`, { headers: { "Authorization": `Bearer ${token}` } }),
          fetch(`${API_URL}/financeiro/todas`, { headers: { "Authorization": `Bearer ${token}` } })
        ])

        if (dashRes.ok) setDashboardData(await dashRes.json())
        if (veicRes.ok) {
          const allVeiculos = await veicRes.json()
          setVeiculosEmRota(allVeiculos.filter((v: any) => v.statusCarga === "EM_TRANSITO").slice(0, 5))
        }
        if (finRes.ok) {
          const allFin = await finRes.json()
          setUltimosServicos(allFin.slice(-5).reverse()) // Últimos 5 lançamentos
        }
      } catch (error) {
        console.error("Erro fetch dashboard:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Carregando métricas...</div>
  }

  const crescimento = 15.2 // Exemplo estático ou calcular do backend
  const crescimentoPositivo = true

  // Mock data for demonstration
  const mockUltimosServicos = [
    { id: 1, cliente: "Transportadora ABC", servico: "Entrega de Carga Pesada", valor: 1250.00, status: "Concluído" },
    { id: 2, cliente: "Construtora XYZ", servico: "Locação de Escavadeira", valor: 3500.00, status: "Em Andamento" },
    { id: 3, cliente: "Logística 123", servico: "Transporte de Equipamento", valor: 800.00, status: "Pendente" },
  ]

  const mockVeiculosEmRota = [
    { placa: "ABC-1234", motorista: "João Silva", destino: "São Paulo", previsao: "14:00" },
    { placa: "DEF-5678", motorista: "Maria Oliveira", destino: "Rio de Janeiro", previsao: "18:30" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das operações JR Pesados
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {dashboardData.faturamentoMensal.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Faturamento Mensal</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm text-green-500">{dashboardData.veiculosEmRota} em rota</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{dashboardData.totalVeiculos}</p>
          <p className="text-sm text-muted-foreground">Total de Veículos</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{dashboardData.locacoesAtivas}</p>
          <p className="text-sm text-muted-foreground">Locações Ativas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            {dashboardData.candidatosPendentes > 0 && (
              <span className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {dashboardData.candidatosPendentes} novos
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{dashboardData.candidatosPendentes}</p>
          <p className="text-sm text-muted-foreground">Candidatos Pendentes</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Últimos serviços */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Últimos Serviços</h2>
            <Link href="/admin/locacoes">
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {ultimosServicos.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">Nenhum serviço registrado recentemente.</div>
            ) : (
              ultimosServicos.map((servico) => (
                <div key={servico.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{servico.cliente}</p>
                    <p className="text-sm text-muted-foreground">{servico.tipoServico}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.valor)}
                    </p>
                    <span className={`text-xs ${
                      servico.status === "PAGO" || servico.status === "Concluído"
                        ? "text-green-500" 
                        : "text-primary"
                    }`}>
                      {servico.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Veículos em rota */}
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Veículos em Rota</h2>
            <Link href="/admin/frota">
              <Button variant="ghost" size="sm">
                Ver frota
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {veiculosEmRota.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">Nenhum veículo em trânsito no momento.</div>
            ) : (
              veiculosEmRota.map((veiculo) => (
                <div key={veiculo.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{veiculo.placa}</p>
                      <p className="text-sm text-muted-foreground">{veiculo.modelo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{veiculo.destino}</p>
                    <p className="text-xs text-muted-foreground">{veiculo.previsaoChegada}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
