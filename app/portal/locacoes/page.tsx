"use client"

import { useState, useEffect } from "react"
import { Package, Calendar, MapPin, Phone, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Locacao {
  id: number
  equipamentoNome: string
  equipamentoMarca: string
  status: string
  dataFim: string
}

export default function LocacoesPage() {
  const [locacoes, setLocacoes] = useState<any[]>([])
  const [selectedLocacao, setSelectedLocacao] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  useEffect(() => {
    const fetchLocacoes = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_URL}/veiculos/meu-perfil`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setLocacoes(data.equipamentos || [])
        }
      } catch (error) {
        console.error("Erro fetch locacoes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLocacoes()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Minhas Locações</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus equipamentos alugados</p>
      </div>

      {/* Details Modal */}
      {selectedLocacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 relative">
            <button onClick={() => setSelectedLocacao(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-4">Detalhes da Locação</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedLocacao.nome}</h3>
                  <p className="text-muted-foreground">{selectedLocacao.marca}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Devolução Prevista</p>
                  <p className="font-medium text-foreground">{selectedLocacao.devolucaoPrevista}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button className="w-full" onClick={() => setSelectedLocacao(null)}>Fechar</Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Carregando locações...</div>
      ) : locacoes.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl bg-card">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">Nenhuma locação ativa</h2>
          <p className="text-muted-foreground">Você não possui locações vinculadas à sua conta.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {locacoes.map((locacao) => (
            <div key={locacao.id} className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{locacao.nome}</h3>
                    <p className="text-sm text-muted-foreground">{locacao.marca}</p>
                  </div>
                </div>
                <Badge>ATIVO</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Devolução prevista: {locacao.devolucaoPrevista}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedLocacao(locacao)}>Ver Detalhes</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
