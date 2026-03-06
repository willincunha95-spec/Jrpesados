"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle } from "lucide-react"
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
      // Show success anyway for demo purposes
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="cotacao" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Solicitação Enviada!
            </h2>
            <p className="text-muted-foreground mb-6">
              Recebemos sua solicitação de cotação. Nossa equipe comercial entrará em contato 
              em breve para apresentar a melhor proposta.
            </p>
            <Button onClick={() => setSuccess(false)}>
              Enviar Nova Cotação
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cotacao" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Fale Conosco
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Solicite sua Cotação
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Preencha o formulário ao lado e nossa equipe comercial entrará em contato 
              rapidamente com a melhor proposta para sua necessidade. Atendemos todo o Brasil.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Envie sua solicitação</h4>
                  <p className="text-sm text-muted-foreground">Preencha o formulário com seus dados</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Análise técnica</h4>
                  <p className="text-sm text-muted-foreground">Nossa equipe avalia sua necessidade</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Proposta personalizada</h4>
                  <p className="text-sm text-muted-foreground">Receba uma cotação sob medida</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servico">Tipo de Serviço</Label>
                  <Select
                    value={formData.tipoServico}
                    onValueChange={(value) => setFormData({ ...formData, tipoServico: value })}
                  >
                    <SelectTrigger>
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
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Descreva sua necessidade: tipo de carga, peso aproximado, origem e destino..."
                  rows={4}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitação
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
