"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Truck,
  Package,
  Users,
  Download,
  Calendar
} from "lucide-react"

const monthlyData = [
  { month: "Jan", faturamento: 125000, servicos: 45, frota: 92 },
  { month: "Fev", faturamento: 142000, servicos: 52, frota: 88 },
  { month: "Mar", faturamento: 138000, servicos: 48, frota: 95 },
  { month: "Abr", faturamento: 165000, servicos: 61, frota: 90 },
  { month: "Mai", faturamento: 178000, servicos: 67, frota: 87 },
  { month: "Jun", faturamento: 195000, servicos: 73, frota: 93 },
]

const serviceBreakdown = [
  { tipo: "Transporte de Container", valor: 320000, percentual: 35 },
  { tipo: "Locação de Munck", valor: 245000, percentual: 27 },
  { tipo: "Remoções Industriais", valor: 183000, percentual: 20 },
  { tipo: "Transporte Especial", valor: 165000, percentual: 18 },
]

const topClientes = [
  { nome: "Indústria ABC Ltda", servicos: 28, valor: 156000 },
  { nome: "Construtora XYZ", servicos: 22, valor: 124000 },
  { nome: "Logística Express", servicos: 19, valor: 98000 },
  { nome: "Metalúrgica Santos", servicos: 15, valor: 87000 },
  { nome: "Transportes União", servicos: 12, valor: 65000 },
]

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("6meses")

  const totalFaturamento = monthlyData.reduce((acc, m) => acc + m.faturamento, 0)
  const totalServicos = monthlyData.reduce((acc, m) => acc + m.servicos, 0)
  const mediaFrota = Math.round(monthlyData.reduce((acc, m) => acc + m.frota, 0) / monthlyData.length)

  const maxFaturamento = Math.max(...monthlyData.map(m => m.faturamento))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Análise de desempenho e métricas do negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="3meses">Últimos 3 meses</SelectItem>
              <SelectItem value="6meses">Últimos 6 meses</SelectItem>
              <SelectItem value="1ano">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faturamento Total</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                R$ {(totalFaturamento / 1000).toFixed(0)}k
              </p>
              <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5% vs período anterior</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Serviços Realizados</p>
              <p className="text-2xl font-bold text-foreground mt-1">{totalServicos}</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+8.3% vs período anterior</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Utilização da Frota</p>
              <p className="text-2xl font-bold text-foreground mt-1">{mediaFrota}%</p>
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <TrendingDown className="h-4 w-4" />
                <span>-2.1% vs período anterior</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              <p className="text-2xl font-bold text-foreground mt-1">127</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+15 novos clientes</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Faturamento */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Evolução do Faturamento</h2>
        </div>
        
        <div className="flex items-end justify-between gap-4 h-64">
          {monthlyData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center">
                <span className="text-sm font-medium text-foreground mb-2">
                  R$ {(data.faturamento / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full bg-primary rounded-t-md transition-all duration-500"
                  style={{ 
                    height: `${(data.faturamento / maxFaturamento) * 180}px`,
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakdown por Serviço */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Faturamento por Serviço</h2>
          <div className="space-y-4">
            {serviceBreakdown.map((service) => (
              <div key={service.tipo}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">{service.tipo}</span>
                  <span className="text-sm font-medium text-foreground">
                    R$ {(service.valor / 1000).toFixed(0)}k ({service.percentual}%)
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${service.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clientes */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Top 5 Clientes</h2>
          <div className="space-y-4">
            {topClientes.map((cliente, index) => (
              <div
                key={cliente.nome}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-8 w-8 bg-primary/20 text-primary font-bold rounded-full">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{cliente.nome}</p>
                    <p className="text-sm text-muted-foreground">{cliente.servicos} serviços</p>
                  </div>
                </div>
                <span className="font-bold text-primary">
                  R$ {(cliente.valor / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas de Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Indicadores de Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-24 w-24 transform -rotate-90">
                <circle
                  className="text-muted"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-emerald-500"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - 0.94)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
              </svg>
              <span className="absolute text-xl font-bold text-foreground">94%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Entregas no Prazo</p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-24 w-24 transform -rotate-90">
                <circle
                  className="text-muted"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - 0.87)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
              </svg>
              <span className="absolute text-xl font-bold text-foreground">87%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Satisfação Cliente</p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-24 w-24 transform -rotate-90">
                <circle
                  className="text-muted"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - 0.78)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
              </svg>
              <span className="absolute text-xl font-bold text-foreground">78%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Taxa Conversão</p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-24 w-24 transform -rotate-90">
                <circle
                  className="text-muted"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-purple-500"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - 0.92)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="48"
                  cy="48"
                />
              </svg>
              <span className="absolute text-xl font-bold text-foreground">92%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Disponibilidade</p>
          </div>
        </div>
      </div>
    </div>
  )
}
