"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "CLIENT" | "ADMIN" | "MECANIC"

export interface User {
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Decode JWT token to get user info
  const decodeToken = (token: string): User | null => {
    try {
      if (!token || !token.includes(".")) return null
      const base64Payload = token.split(".")[1]
      let payloadText = ""
      
      if (typeof window !== "undefined") {
        payloadText = atob(base64Payload)
      } else {
        payloadText = Buffer.from(base64Payload, "base64").toString()
      }
      
      const payload = JSON.parse(payloadText)
      return {
        email: payload.sub,
        role: payload.role || "CLIENT",
      }
    } catch (e) {
      console.error("Erro ao decodificar token:", e)
      return null
    }
  }

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
      } else {
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"
    
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        let errorMessage = "E-mail ou senha incorretos."
        try {
            const serverError = await res.text()
            if (serverError && !serverError.includes("<!DOCTYPE")) {
                errorMessage = serverError
            }
        } catch (e) {}
        throw new Error(errorMessage)
    }

    const token = await res.text()
    localStorage.setItem("token", token)
    
    const decoded = decodeToken(token)
    if (decoded) {
      setUser(decoded)
      // Redirect based on role
      if (decoded.role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/portal")
      }
    }
  }

  const register = async (email: string, password: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jrpesadostransportes.com.br"
    
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "CLIENT" }),
    })

    if (!res.ok) {
      let errorMessage = "Falha no cadastro. O e-mail pode já estar em uso."
      try {
          const serverError = await res.text()
          if (serverError && !serverError.includes("<!DOCTYPE")) {
              errorMessage = serverError
          }
      } catch (e) {}
      throw new Error(errorMessage)
    }

    // Com verificação de e-mail ativa, não podemos fazer auto-login direto!
    // O usuário deve ver a mensagem de sucesso e verificar seu e-mail.
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  const isAdmin = user?.role === "ADMIN"

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
