"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  FileText, 
  Download,
  Loader2,
  Calendar,
  User,
  Briefcase,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Financeiro {
  id: number;
  cliente: string;
  tipoServico: string;
  descricao: string;
  valor: number;
  tipo: "RECEITA" | "DESPESA";
  status: string;
  dataMovimentacao: string;
}

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Financeiro[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [form, setForm] = useState({
    cliente: "",
    tipoServico: "",
    descricao: "",
    valor: "",
    tipo: "RECEITA",
    status: "PAGO"
  })

  useEffect(() => {
    fetchTransacoes()
  }, [])

  const fetchTransacoes = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://api.jrpesadostransportes.com.br/financeiro/todas", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setTransacoes(data)
      }
    } catch (error) {
      console.error("Erro ao buscar financeiro:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = localStorage.getItem("token")
      const payload = {
        cliente: form.cliente,
        tipoServico: form.tipoServico,
        descricao: form.descricao || "Sem observações",
        valor: parseFloat(form.valor),
        tipo: form.tipo,
        status: form.status
      }

      const res = await fetch(`https://api.jrpesadostransportes.com.br/financeiro/registrar`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setForm({ cliente: "", tipoServico: "", descricao: "", valor: "", tipo: "RECEITA", status: "PAGO" })
        fetchTransacoes()
      } else {
        const errorText = await res.text()
        console.error("Erro ao registrar transação:", errorText)
      }
    } catch (error) {
      console.error("Erro ao registrar:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownloadPdf = async (id: number) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://api.jrpesadostransportes.com.br/financeiro/pdf/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `fatura-jr-${id}.pdf`
        document.body.appendChild(a)
        a.click()
        a.remove()
      }
    } catch (error) {
      console.error("Erro no download:", error)
    }
  }

  const entradas = transacoes
    .filter(t => t.tipo === "RECEITA")
    .reduce((acc, t) => acc + t.valor, 0)
    
  const saidas = transacoes
    .filter(t => t.tipo === "DESPESA")
    .reduce((acc, t) => acc + t.valor, 0)
    
  const lucro = entradas - saidas

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground mt-1">Gestão de receitas, despesas e faturamento da JR Pesados</p>
        </div>
      </div>

      {/* Resumo de Caixa */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total de Entradas
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entradas)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total de Saídas
            </CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saidas)}
            </div>
          </CardContent>
        </Card>

        <Card className={`border-l-4 ${lucro >= 0 ? "border-l-blue-500" : "border-l-orange-500"} bg-card/50`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Lucro Líquido
            </CardTitle>
            <Wallet className={`h-5 w-5 ${lucro >= 0 ? "text-blue-500" : "text-orange-500"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${lucro >= 0 ? "text-blue-500" : "text-orange-500"}`}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucro)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Formulário lateral */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Nova Transação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cliente</label>
                  <Input 
                    placeholder="Ex: Sabesp, FGS, Tauá" 
                    value={form.cliente}
                    onChange={e => setForm({...form, cliente: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Serviço</label>
                  <Select 
                    value={form.tipoServico} 
                    onValueChange={v => setForm({...form, tipoServico: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Locação">Locação</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Desova">Desova</SelectItem>
                      <SelectItem value="Manutenção">Manutenção</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Valor (R$)</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={form.valor}
                    onChange={e => setForm({...form, valor: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <Select 
                      value={form.tipo} 
                      onValueChange={(v: any) => setForm({...form, tipo: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RECEITA">Entrada</SelectItem>
                        <SelectItem value="DESPESA">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={form.status} 
                      onValueChange={v => setForm({...form, status: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PAGO">Pago</SelectItem>
                        <SelectItem value="PENDENTE">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Observações</label>
                  <Input 
                    placeholder="Opcional" 
                    value={form.descricao}
                    onChange={e => setForm({...form, descricao: e.target.value})}
                  />
                </div>
                <Button className="w-full mt-4" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Salvar Transação
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Transações */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Histórico de Lançamentos</CardTitle>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr className="text-left">
                      <th className="p-3 font-medium text-muted-foreground">Data</th>
                      <th className="p-3 font-medium text-muted-foreground">Cliente / Serviço</th>
                      <th className="p-3 font-medium text-muted-foreground">Valor</th>
                      <th className="p-3 font-medium text-muted-foreground">Status</th>
                      <th className="p-3 font-medium text-muted-foreground text-center">NF</th>
                      <th className="p-3 font-medium text-muted-foreground text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          Nenhuma transação financeira registrada.
                        </td>
                      </tr>
                    ) : (
                      transacoes.map((t) => (
                        <tr key={t.id} className="border-b transition-colors hover:bg-muted/30">
                          <td className="p-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(t.dataMovimentacao).toLocaleDateString('pt-BR')}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-foreground">{t.cliente}</div>
                            <div className="text-xs text-muted-foreground">{t.tipoServico}</div>
                          </td>
                          <td className={`p-3 font-bold ${t.tipo === "RECEITA" ? "text-green-600" : "text-red-500"}`}>
                            {t.tipo === "RECEITA" ? "+" : "-"} 
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                          </td>
                          <td className="p-3">
                            <Badge variant={t.status === "PAGO" ? "default" : "outline"} className={t.status === "PAGO" ? "bg-green-500/20 text-green-600 border-none px-2" : "px-2"}>
                              {t.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                              onClick={() => handleDownloadPdf(t.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={async () => {
                                if (confirm("Excluir este lançamento?")) {
                                  try {
                                    const token = localStorage.getItem("token")
                                    const res = await fetch(`https://api.jrpesadostransportes.com.br/financeiro/${t.id}`, {
                                      method: "DELETE",
                                      headers: { "Authorization": `Bearer ${token}` }
                                    })
                                    if (res.ok) fetchTransacoes()
                                  } catch (e) { console.error(e) }
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
