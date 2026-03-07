import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk"
})

export const metadata: Metadata = {
  title: "JR Pesados - Transportes e Remoções",
  description: "Soluções completas em transportes pesados, locação de equipamentos e remoções industriais. Caminhões Munck, Guinchos e Empilhadeiras.",
  keywords: ["transportes pesados", "munck", "guindaste", "remoções", "locação de equipamentos", "logística"],
}

export const viewport: Viewport = {
  themeColor: "#FFAA00",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  )
}
