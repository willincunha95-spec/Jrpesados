"use client"

import { DollarSign, Truck, Package, Users, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demo
const mockDashboardData = {
  faturamentoMensal: 185000,
  faturamentoAnterior: 162000,
  totalVeiculos: 52,
  veiculosEmRota: 18,
  locacoesAtivas: 24,
  candidatosPendentes: 8,
}

const mockUltimosServicos = [
  { id: 1, cliente: "Construtora ABC", servico: "Locação Munck", valor: 4500, status: "Em Andamento" },
  { id: 2, cliente: "Indústria XYZ", servico: "Transporte", valor: 3200, status: "Concluído" },
  { id: 3, cliente: "Logística Beta", servico: "Locação Empilhadeira", valor: 2400, status: "Em Andamento" },
  { id: 4, cliente: "Metalúrgica Delta", servico: "Remoção Industrial", valor: 8500, status: "Agendado" },
]

const mockVeiculosEmRota = [
  { placa: "ABC-1234", motorista: "João Silva", destino: "Campinas, SP", previsao: "Hoje, 18:00" },
  { placa: "XYZ-5678", motorista: "Carlos Santos", destino: "São Paulo, SP", previsao: "Amanhã, 10:00" },
  { placa: "DEF-9012", motorista: "Pedro Lima", destino: "Guarulhos, SP", previsao: "Hoje, 20:30" },
]

export default function AdminDashboard() {
  const crescimento = ((mockDashboardData.faturamentoMensal - mockDashboardData.faturamentoAnterior) / mockDashboardData.faturamentoAnterior * 100).toFixed(1)
  const crescimentoPositivo = Number(crescimento) > 0

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
            <div className={`flex items-center gap-1 text-sm ${crescimentoPositivo ? 'text-green-500' : 'text-red-500'}`}>
              {crescimentoPositivo ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {crescimento}%
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            R$ {mockDashboardData.faturamentoMensal.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm text-muted-foreground">Faturamento Mensal</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm text-green-500">{mockDashboardData.veiculosEmRota} em rota</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockDashboardData.totalVeiculos}</p>
          <p className="text-sm text-muted-foreground">Total de Veículos</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockDashboardData.locacoesAtivas}</p>
          <p className="text-sm text-muted-foreground">Locações Ativas</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            {mockDashboardData.candidatosPendentes > 0 && (
              <span className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {mockDashboardData.candidatosPendentes} novos
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground">{mockDashboardData.candidatosPendentes}</p>
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
            {mockUltimosServicos.map((servico) => (
              <div key={servico.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{servico.cliente}</p>
                  <p className="text-sm text-muted-foreground">{servico.servico}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    R$ {servico.valor.toLocaleString("pt-BR")}
                  </p>
                  <span className={`text-xs ${
                    servico.status === "Concluído" 
                      ? "text-green-500" 
                      : servico.status === "Em Andamento"
                      ? "text-primary"
                      : "text-blue-500"
                  }`}>
                    {servico.status}
                  </span>
                </div>
              </div>
            ))}
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
            {mockVeiculosEmRota.map((veiculo) => (
              <div key={veiculo.placa} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{veiculo.placa}</p>
                    <p className="text-sm text-muted-foreground">{veiculo.motorista}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{veiculo.destino}</p>
                  <p className="text-xs text-muted-foreground">{veiculo.previsao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
