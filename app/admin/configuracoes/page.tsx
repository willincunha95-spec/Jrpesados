"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Building2, 
  Bell, 
  Shield, 
  Mail,
  Save,
  Check
} from "lucide-react"

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false)
  const [companyData, setCompanyData] = useState({
    nome: "JR Pesados Transportes e Remoções",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 4567-8901",
    email: "contato@jrpesados.com.br",
    endereco: "Av. Industrial, 1500 - São Paulo, SP",
    sobre: "Empresa líder em transportes pesados e locação de equipamentos industriais.",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações do sistema e da empresa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu Lateral */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { icon: Building2, label: "Empresa", active: true },
              { icon: Bell, label: "Notificações", active: false },
              { icon: Shield, label: "Segurança", active: false },
              { icon: Mail, label: "E-mail", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  item.active
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Formulário */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Dados da Empresa</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input
                  id="nome"
                  value={companyData.nome}
                  onChange={(e) => setCompanyData({ ...companyData, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={companyData.cnpj}
                  onChange={(e) => setCompanyData({ ...companyData, cnpj: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={companyData.telefone}
                  onChange={(e) => setCompanyData({ ...companyData, telefone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={companyData.endereco}
                  onChange={(e) => setCompanyData({ ...companyData, endereco: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="sobre">Sobre a Empresa</Label>
                <Textarea
                  id="sobre"
                  rows={4}
                  value={companyData.sobre}
                  onChange={(e) => setCompanyData({ ...companyData, sobre: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} disabled={saved}>
                {saved ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Salvo
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Configurações de Notificações */}
          <div className="bg-card border border-border rounded-lg p-6 mt-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Notificações</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: "Novas cotações", description: "Receber alerta quando uma nova cotação for solicitada", enabled: true },
                { label: "Atualizações de serviço", description: "Notificar sobre mudanças no status dos serviços", enabled: true },
                { label: "Novos candidatos", description: "Alerta quando novos candidatos se cadastrarem", enabled: false },
                { label: "Relatórios semanais", description: "Receber resumo semanal por e-mail", enabled: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.enabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
