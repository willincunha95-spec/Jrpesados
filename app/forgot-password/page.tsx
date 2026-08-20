"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Loader2, Mail, Lock, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: Email, 2: Token + New Password
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setStep(2)
        setMessage({ 
          type: "success", 
          text: "Token enviado! Verifique sua caixa de entrada (e pasta de spam)." 
        })
      } else {
        setMessage({ type: "error", text: "Erro ao solicitar recuperação. Tente novamente." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro de conexão com o servidor." })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword })
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Senha alterada com sucesso! Você será redirecionado para o login." })
        setTimeout(() => router.push("/login"), 3000)
      } else {
        const errorText = await res.text()
        setMessage({ type: "error", text: errorText || "Token inválido ou expirado." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro de conexão com o servidor." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-xl">
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Login
          </Link>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Recuperar Senha
          </h1>
          <p className="text-muted-foreground mt-2">
            {step === 1 
              ? "Informe seu e-mail para receber o token de recuperação." 
              : "Insira o token recebido e sua nova senha."}
          </p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg flex items-start gap-3 text-sm ${
            message.type === "success" 
              ? "bg-green-500/10 border border-green-500/20 text-green-500" 
              : "bg-destructive/10 border border-destructive/20 text-destructive"
          }`}>
            {message.type === "success" && <CheckCircle2 className="h-5 w-5 flex-shrink-0" />}
            {message.text}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestToken} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cadastrado</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Solicitar Token
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Token (8 caracteres)</Label>
              <Input
                id="token"
                type="text"
                placeholder="Ex: A1B2C3D4"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Redefinir Senha
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full text-xs" 
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Usar outro e-mail
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
