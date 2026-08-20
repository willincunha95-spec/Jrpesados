"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin,
  Save,
  Check,
  Lock
} from "lucide-react"

export default function PerfilPage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [profileData, setProfileData] = useState({
    nome: user?.email ? user.email.split('@')[0] : "Cliente",
    email: user?.email || "cliente@email.com",
    telefone: "(11) 99999-8888",
    empresa: "Empresa do Cliente Ltda",
    cnpj: "98.765.432/0001-10",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    cep: "01234-567",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações pessoais e de contato
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card do Perfil */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="h-24 w-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{profileData.nome}</h2>
            <p className="text-muted-foreground">{profileData.email}</p>
            <p className="text-sm text-muted-foreground mt-2">{profileData.empresa}</p>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <p>Cliente desde</p>
                <p className="text-foreground font-medium">Janeiro de 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados Pessoais */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Dados Pessoais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={profileData.nome}
                  onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefone"
                    className="pl-10"
                    value={profileData.telefone}
                    onChange={(e) => setProfileData({ ...profileData, telefone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dados da Empresa */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Dados da Empresa</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="empresa">Razão Social</Label>
                <Input
                  id="empresa"
                  value={profileData.empresa}
                  onChange={(e) => setProfileData({ ...profileData, empresa: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={profileData.cnpj}
                  onChange={(e) => setProfileData({ ...profileData, cnpj: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endereco"
                    className="pl-10"
                    value={profileData.endereco}
                    onChange={(e) => setProfileData({ ...profileData, endereco: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={profileData.cep}
                  onChange={(e) => setProfileData({ ...profileData, cep: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Segurança</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="senha_atual">Senha Atual</Label>
                <Input id="senha_atual" type="password" placeholder="••••••••" />
              </div>

              <div></div>

              <div className="space-y-2">
                <Label htmlFor="nova_senha">Nova Senha</Label>
                <Input id="nova_senha" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar_senha">Confirmar Nova Senha</Label>
                <Input id="confirmar_senha" type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saved} size="lg">
              {saved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Salvo com Sucesso
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
      </div>
    </div>
  )
}
