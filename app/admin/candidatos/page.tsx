"use client"

import { User, Mail, Phone, Briefcase, ExternalLink, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockCandidatos = [
  {
    id: 1,
    nome: "Carlos Oliveira",
    email: "carlos@email.com",
    telefone: "(11) 99999-1111",
    cargoPretendido: "Motorista",
    linkCurriculo: "https://drive.google.com/file/d/example1",
    dataEnvio: "05/03/2026",
    status: "PENDENTE",
  },
  {
    id: 2,
    nome: "Ricardo Santos",
    email: "ricardo@email.com",
    telefone: "(11) 99999-2222",
    cargoPretendido: "Operador de Munck",
    linkCurriculo: "https://linkedin.com/in/ricardo",
    dataEnvio: "04/03/2026",
    status: "PENDENTE",
  },
  {
    id: 3,
    nome: "Fernando Lima",
    email: "fernando@email.com",
    telefone: "(11) 99999-3333",
    cargoPretendido: "Mecânico",
    linkCurriculo: "https://drive.google.com/file/d/example2",
    dataEnvio: "03/03/2026",
    status: "APROVADO",
  },
  {
    id: 4,
    nome: "José Pereira",
    email: "jose@email.com",
    telefone: "(11) 99999-4444",
    cargoPretendido: "Operador de Guindaste",
    linkCurriculo: "https://drive.google.com/file/d/example3",
    dataEnvio: "02/03/2026",
    status: "REJEITADO",
  },
  {
    id: 5,
    nome: "Marcos Silva",
    email: "marcos@email.com",
    telefone: "(11) 99999-5555",
    cargoPretendido: "Motorista",
    linkCurriculo: "https://linkedin.com/in/marcos",
    dataEnvio: "01/03/2026",
    status: "PENDENTE",
  },
]

const statusConfig = {
  PENDENTE: { label: "Pendente", variant: "outline" as const, color: "text-primary" },
  APROVADO: { label: "Aprovado", variant: "default" as const, color: "text-green-500" },
  REJEITADO: { label: "Rejeitado", variant: "destructive" as const, color: "text-red-500" },
}

export default function CandidatosPage() {
  const pendentes = mockCandidatos.filter(c => c.status === "PENDENTE")
  const aprovados = mockCandidatos.filter(c => c.status === "APROVADO")
  const rejeitados = mockCandidatos.filter(c => c.status === "REJEITADO")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Candidatos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os currículos recebidos pelo site
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-2xl font-bold text-foreground">{mockCandidatos.length}</p>
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
        {mockCandidatos.map((candidato) => {
          const status = statusConfig[candidato.status as keyof typeof statusConfig]
          
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
                    href={candidato.linkCurriculo}
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
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
