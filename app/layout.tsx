import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"]
})

export const metadata: Metadata = {
  title: "JR Transportes e Logística - Soluções em Cargas Pesadas",
  description: "Soluções completas em transportes pesados, locação de equipamentos e remoções industriais. Caminhões Munck, Guinchos e Empilhadeiras. Desde 2010.",
  keywords: ["transportes pesados", "munck", "guindaste", "remoções", "locação de equipamentos", "logística", "cargas pesadas"],
}

export const viewport: Viewport = {
  themeColor: "#1a2744",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
