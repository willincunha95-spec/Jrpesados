"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CotacaoRequest } from "@/lib/api"

const serviceTypes = [
  { value: "transporte", label: "Transporte de Cargas" },
  { value: "locacao-munck", label: "Locação de Munck" },
  { value: "locacao-equipamento", label: "Locação de Equipamento" },
  { value: "remocao", label: "Remoção Industrial" },
  { value: "outro", label: "Outro" },
]

const steps = [
  { number: "01", title: "Envie sua solicitação", description: "Preencha o formulário com seus dados" },
  { number: "02", title: "Análise técnica", description: "Nossa equipe avalia sua necessidade" },
  { number: "03", title: "Proposta personalizada", description: "Receba uma cotação sob medida" },
]

export function QuoteForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<CotacaoRequest>({
    nome: "",
    empresa: "",
    telefone: "",
    tipoServico: "",
    mensagem: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
      const res = await fetch(`${API_URL}/leads/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          nome: "",
          empresa: "",
          telefone: "",
          tipoServico: "",
          mensagem: "",
        })
      }
    } catch (error) {
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="cotacao" className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-4">
              Solicitação Enviada
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Nossa equipe comercial entrará em contato em breve para apresentar a melhor proposta para sua necessidade.
            </p>
            <Button onClick={() => setSuccess(false)} className="rounded-full px-8">
              Enviar Nova Cotação
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cotacao" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Contato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
              Solicite sua <span className="italic">Cotação</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Preencha o formulário e nossa equipe comercial entrará em contato rapidamente com a melhor proposta. Atendemos todo o Brasil.
            </p>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <span className="text-sm font-medium text-accent">{step.number}</span>
                  <div className="flex-1 pb-6 border-b border-border last:border-0 last:pb-0">
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">Nome completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-sm font-medium">Empresa</Label>
                  <Input
                    id="empresa"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servico" className="text-sm font-medium">Tipo de Serviço</Label>
                  <Select
                    value={formData.tipoServico}
                    onValueChange={(value) => setFormData({ ...formData, tipoServico: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-sm font-medium">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Descreva sua necessidade: tipo de carga, peso aproximado, origem e destino..."
                  rows={5}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  required
                  className="rounded-xl resize-none"
                />
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl text-base gap-2 group" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Solicitação
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
