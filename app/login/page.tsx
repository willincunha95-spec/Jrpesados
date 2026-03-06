"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.")
    } finally {
      setLoading(false)
    }
  }

  // Demo login for testing
  const handleDemoLogin = async (role: "client" | "admin") => {
    setLoading(true)
    
    // Simulate login for demo
    const demoToken = btoa(
      JSON.stringify({ sub: role === "admin" ? "admin@jrpesados.com" : "cliente@email.com", role: role === "admin" ? "ADMIN" : "CLIENT" })
    )
    localStorage.setItem("token", `header.${demoToken}.signature`)
    
    router.push(role === "admin" ? "/admin" : "/portal")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
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
            <h2 className="text-2xl font-display font-bold text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground mt-2">
              Faça login para acessar sua conta
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
              <div className="flex justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
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

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou para testar
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin("client")}
              disabled={loading}
            >
              Demo Cliente
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDemoLogin("admin")}
              disabled={loading}
            >
              Demo Admin
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Background */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Truck className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground">
            Portal do Cliente
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Acompanhe suas locações, rastreie suas cargas em tempo real e gerencie 
            todos os seus serviços em um só lugar.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-xs text-muted-foreground">Rastreamento</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-primary">100%</p>
              <p className="text-xs text-muted-foreground">Seguro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
