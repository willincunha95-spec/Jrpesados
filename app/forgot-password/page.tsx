"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2, ArrowLeft, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      
      // Simulate success regardless of API response for security/UX
      setSuccess(true)
    } catch (err) {
      setSuccess(true) // Still show success so we don't leak registered emails
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
            <KeyRound className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground">
            Recuperação de Acesso
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Esqueceu sua senha? Não tem problema. Informe seu e-mail e enviaremos
            as instruções para você criar uma nova senha.
          </p>
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
            
            <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors w-fit mx-auto md:mx-0">
              <ArrowLeft className="h-4 w-4" />
              Voltar para login
            </Link>

            <h2 className="text-2xl font-display font-bold text-foreground text-left">
              Esqueci a Senha
            </h2>
            <p className="text-muted-foreground mt-2 text-left">
              Informe seu e-mail cadastrado
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Recuperar Senha"
                )}
              </Button>
            </form>
          ) : (
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center space-y-4">
              <h3 className="font-bold text-lg text-foreground">Verifique seu e-mail</h3>
              <p className="text-sm text-muted-foreground">
                Se o e-mail <strong>{email}</strong> estiver cadastrado em nossa base, 
                você receberá um link para redefinir sua senha em instantes.
              </p>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/login">Voltar ao Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
