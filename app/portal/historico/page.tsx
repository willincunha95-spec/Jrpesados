"use client"

import { useState, useEffect } from "react"
import { Calendar, Package, Truck, FileText, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Historico {
  id: number
  data: string
  descricao: string
  valor: number
  numeroNota: string
  linkNotaPdf: string
}

export default function HistoricoPage() {
  const [historico, setHistorico] = useState<Historico[]>([])
  const [selectedItem, setSelectedItem] = useState<Historico | null>(null)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/financeiro/meu-historico`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setHistorico(data)
        }
      } catch (error) {
        console.error("Erro fetch historico:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistorico()
  }, [])

  const handleExport = () => {
    if (historico.length === 0) return
    const headers = ["ID", "Data", "Descricao", "Valor", "NF"]
    const csvContent = [
      headers.join(","),
      ...historico.map(item => [
        item.id,
        item.data,
        `"${item.descricao}"`,
        item.valor,
        item.numeroNota
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "historico_jrpesados.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadNF = (id: number) => {
    window.open(`${API_URL}/financeiro/pdf/${id}`, "_blank")
  }

  const totalGasto = historico.reduce((acc, item) => acc + item.valor, 0)

  if (loading) return <div className="p-8 text-center text-muted-foreground">Carregando histórico...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Histórico de Serviços</h1>
        <p className="text-muted-foreground mt-1">Veja todos os seus serviços contratados</p>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-4">Detalhes do Serviço</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/20 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Descrição</p>
                <p className="text-lg font-medium text-foreground">{selectedItem.descricao}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{selectedItem.data}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-xl font-bold text-primary">R$ {selectedItem.valor.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nota Fiscal</p>
                  <p className="font-medium">{selectedItem.numeroNota || "Não emitida"}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-2">
              <Button className="flex-1" onClick={() => setSelectedItem(null)}>Fechar</Button>
              {selectedItem.numeroNota && (
                <Button variant="outline" onClick={() => handleDownloadNF(selectedItem.id)}>
                  <Download className="h-4 w-4 mr-2" /> PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Total de Serviços</p>
          <p className="text-3xl font-bold text-foreground mt-1">{historico.length}</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground">Total Investido</p>
          <p className="text-3xl font-bold text-foreground mt-1">R$ {totalGasto.toLocaleString("pt-BR")}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Todos os Serviços</h2>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={historico.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        <div className="divide-y divide-border">
          {historico.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum serviço registrado no histórico.</div>
          ) : (
            historico.map((item) => (
              <div key={item.id} className="p-4 hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.descricao}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{item.data}</span>
                      <span className="text-sm text-muted-foreground">{item.numeroNota}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">R$ {item.valor.toLocaleString("pt-BR")}</p>
                    <Button variant="ghost" size="sm" className="mt-1" onClick={() => setSelectedItem(item)}>Ver detalhes</Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
