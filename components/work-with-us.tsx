"use client"

import { useState } from "react"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Candidato } from "@/lib/api"

const positions = [
  { value: "motorista", label: "Motorista" },
  { value: "operador-munck", label: "Operador de Munck" },
  { value: "operador-guindaste", label: "Operador de Guindaste" },
  { value: "mecanico", label: "Mecânico" },
  { value: "administrativo", label: "Administrativo" },
  { value: "outro", label: "Outro" },
]

export function WorkWithUs() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<Candidato>({
    nome: "",
    email: "",
    telefone: "",
    cargoPretendido: "",
    linkCurriculo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
      const res = await fetch(`${API_URL}/trabalhe-conosco`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          cargoPretendido: "",
          linkCurriculo: "",
        })
      }
    } catch (error) {
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="trabalhe-conosco" className="py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Carreiras
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
              Faça parte do nosso <span className="italic">time</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Estamos sempre em busca de profissionais qualificados para fazer parte da nossa equipe. Confira as vagas disponíveis e envie seu currículo.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/50 rounded-2xl">
                <p className="text-3xl font-display text-foreground">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Colaboradores</p>
              </div>
              <div className="p-6 bg-secondary/50 rounded-2xl">
                <p className="text-3xl font-display text-foreground">25+</p>
                <p className="text-sm text-muted-foreground mt-1">Anos de história</p>
              </div>
            </div>
          </div>

          {/* Right form */}
          {success ? (
            <div className="text-center py-16 bg-card border border-border rounded-3xl">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-display text-foreground mb-4">
                Currículo Enviado
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Analisaremos seu perfil e entraremos em contato caso haja uma vaga compatível.
              </p>
              <Button onClick={() => setSuccess(false)} className="rounded-full px-8">
                Enviar Outro
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Cadastre seu currículo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Preencha os dados e envie o link do seu currículo
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="candidato-nome" className="text-sm font-medium">Nome completo</Label>
                    <Input
                      id="candidato-nome"
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidato-email" className="text-sm font-medium">E-mail</Label>
                    <Input
                      id="candidato-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="candidato-telefone" className="text-sm font-medium">Telefone</Label>
                    <Input
                      id="candidato-telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidato-cargo" className="text-sm font-medium">Cargo pretendido</Label>
                    <Select
                      value={formData.cargoPretendido}
                      onValueChange={(value) =>
                        setFormData({ ...formData, cargoPretendido: value })
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="candidato-curriculo" className="text-sm font-medium">Link do currículo</Label>
                  <Input
                    id="candidato-curriculo"
                    type="url"
                    placeholder="Link do Google Drive, Dropbox ou LinkedIn"
                    value={formData.linkCurriculo}
                    onChange={(e) =>
                      setFormData({ ...formData, linkCurriculo: e.target.value })
                    }
                    required
                    className="h-12 rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    Compartilhe via Google Drive, Dropbox ou perfil do LinkedIn
                  </p>
                </div>

                <Button type="submit" className="w-full h-14 rounded-xl text-base gap-2 group" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Currículo
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
