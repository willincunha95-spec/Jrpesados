"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Loader2, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.")
      return
    }

    setLoading(true)

    try {
      await register(email, password)
    } catch (err: any) {
      setError(err.message || "Falha no cadastro. O e-mail pode já estar em uso.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground">
            Crie sua Conta
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Cadastre-se gratuitamente e tenha acesso a todos os recursos do 
            Portal do Cliente JR Pesados.
          </p>
          <ul className="text-left space-y-3 pt-6">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">1</span>
              </div>
              Acompanhe suas locações em tempo real
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">2</span>
              </div>
              Rastreie suas cargas no mapa
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">3</span>
              </div>
              Histórico completo de serviços
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <Image
                src="/images/logo.jpg"
                alt="JR Pesados"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="text-left">
                <h1 className="font-display font-bold text-xl text-foreground">JR Pesados</h1>
                <p className="text-xs text-muted-foreground">Transportes e Remoções</p>
              </div>
            </Link>
            
            <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors w-fit">
              <ArrowLeft className="h-4 w-4" />
              Voltar para login
            </Link>

            <h2 className="text-2xl font-display font-bold text-foreground">
              Criar nova conta
            </h2>
            <p className="text-muted-foreground mt-2">
              Preencha os dados abaixo para se cadastrar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Faça login
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            Ao criar sua conta, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
