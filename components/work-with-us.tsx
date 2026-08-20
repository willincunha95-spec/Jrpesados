"use client"

import { useState } from "react"
import { Users, Loader2, CheckCircle } from "lucide-react"
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
  const [formData, setFormData] = useState<Candidato & { arquivo?: File }>({
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
      // User FormData to support file upload again
      const data = new FormData()
      data.append("nome", formData.nome)
      data.append("email", formData.email)
      data.append("telefone", formData.telefone)
      data.append("cargoPretendido", formData.cargoPretendido)
      if (formData.linkCurriculo) data.append("linkCurriculo", formData.linkCurriculo)
      if (formData.arquivo) data.append("arquivo", formData.arquivo)

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"
      const res = await fetch(`${API_URL}/trabalhe-conosco`, {
        method: "POST",
        body: data,
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
      } else {
        const errText = await res.text()
        alert("Erro ao enviar: " + errText)
      }
    } catch (error: any) {
      alert("Erro de conexão: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="trabalhe-conosco" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Faça Parte do Time
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Trabalhe Conosco
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos sempre em busca de profissionais qualificados para fazer parte da nossa equipe. 
              Confira as vagas disponíveis e envie seu currículo.
            </p>
          </div>

          {success ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Currículo Enviado!
              </h3>
              <p className="text-muted-foreground mb-6">
                Recebemos seu currículo. Analisaremos seu perfil e entraremos em contato 
                caso haja uma vaga compatível.
              </p>
              <Button onClick={() => setSuccess(false)}>
                Enviar Outro Currículo
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Cadastre seu currículo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Preencha os dados abaixo e envie o link do seu currículo
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidato-nome">Nome completo</Label>
                    <Input
                      id="candidato-nome"
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidato-email">E-mail</Label>
                    <Input
                      id="candidato-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidato-telefone">Telefone</Label>
                    <Input
                      id="candidato-telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidato-cargo">Cargo pretendido</Label>
                    <Select
                      value={formData.cargoPretendido}
                      onValueChange={(value) =>
                        setFormData({ ...formData, cargoPretendido: value })
                      }
                    >
                      <SelectTrigger>
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidato-curriculo">Link do currículo</Label>
                    <Input
                      id="candidato-curriculo"
                      type="url"
                      placeholder="Link do Google Drive, Dropbox ou LinkedIn"
                      value={formData.linkCurriculo}
                      onChange={(e) =>
                        setFormData({ ...formData, linkCurriculo: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidato-arquivo">Anexar Currículo (PDF, Word)</Label>
                    <Input
                      id="candidato-arquivo"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setFormData({ ...formData, arquivo: file })
                      }}
                      className="cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 hover:file:bg-primary/90"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Você pode enviar o link ou anexar o arquivo diretamente
                </p>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Currículo"
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
