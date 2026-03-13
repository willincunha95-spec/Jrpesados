"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Briefcase, ExternalLink, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

interface Candidato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargoPretendido: string;
  linkCurriculo: string;
  // Fallbacks visually as backend doesn't have these yet
  dataEnvio?: string;
  status?: string;
}

const statusConfig = {
  PENDENTE: { label: "Pendente", variant: "outline" as const, color: "text-primary" },
  APROVADO: { label: "Aprovado", variant: "default" as const, color: "text-green-500" },
  REJEITADO: { label: "Rejeitado", variant: "destructive" as const, color: "text-red-500" },
}

export default function CandidatosPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchCandidatos()
  }, [])

  const fetchCandidatos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8080/trabalhe-conosco", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar candidatos (Status: ${response.status} ${response.statusText})`)
      }

      const data = await response.json()
      // Adding visual fallbacks for fields that the backend does not provide yet
      const processedData = data.map((cand: Candidato) => ({
        ...cand,
        status: cand.status || "PENDENTE",
        dataEnvio: cand.dataEnvio || "Via Site JR Pesados"
      }))
      
      setCandidatos(processedData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, action: "aprovar" | "rejeitar") => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/trabalhe-conosco/${id}/${action}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Erro ao ${action} candidato.`)
      }

      await fetchCandidatos() // Refresh list
    } catch (err: any) {
      alert(err.message)
    }
  }

  const pendentes = candidatos.filter(c => c.status === "PENDENTE")
  const aprovados = candidatos.filter(c => c.status === "APROVADO")
  const rejeitados = candidatos.filter(c => c.status === "REJEITADO")

  if (loading) {
    return (
      <div className="flex -mt-20 items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Candidatos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os currículos recebidos pelo site
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{candidatos.length}</p>
          <p className="text-sm text-muted-foreground">Total Recebidos</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-primary">{pendentes.length}</p>
          <p className="text-sm text-muted-foreground">Pendentes</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-green-500">{aprovados.length}</p>
          <p className="text-sm text-muted-foreground">Aprovados</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-red-500">{rejeitados.length}</p>
          <p className="text-sm text-muted-foreground">Rejeitados</p>
        </div>
      </div>

      {/* Candidates list */}
      <div className="space-y-4">
        {candidatos.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Nenhum candidato encontrado</h3>
            <p className="text-muted-foreground mt-1">Os currículos enviados pelo site aparecerão aqui.</p>
          </div>
        ) : (
          candidatos.map((candidato) => {
            const status = statusConfig[candidato.status as keyof typeof statusConfig] || statusConfig.PENDENTE
          
          return (
            <div
              key={candidato.id}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{candidato.nome}</h3>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {candidato.cargoPretendido}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {candidato.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {candidato.telefone}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enviado em {candidato.dataEnvio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={candidato.linkCurriculo?.startsWith("http") ? candidato.linkCurriculo : `http://localhost:8080${candidato.linkCurriculo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver Currículo
                    </Button>
                  </a>
                  {candidato.status === "PENDENTE" && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleUpdateStatus(candidato.id, "aprovar")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleUpdateStatus(candidato.id, "rejeitar")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
          })
        )}
      </div>
    </div>
  )
}
