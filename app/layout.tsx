import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
})

export const metadata: Metadata = {
  title: "JR Pesados - Transportes e Remoções",
  description: "Soluções completas em transportes pesados, locação de equipamentos e remoções industriais. Caminhões Munck, Guinchos e Empilhadeiras.",
  keywords: ["transportes pesados", "munck", "guindaste", "remoções", "locação de equipamentos", "logística"],
}

export const viewport: Viewport = {
  themeColor: "#1a1917",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
