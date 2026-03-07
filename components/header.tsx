"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cotacao", label: "Cotação" },
  { href: "#trabalhe-conosco", label: "Trabalhe Conosco" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="JR Pesados"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-foreground">JR Pesados</h1>
              <p className="text-xs text-muted-foreground">Transportes e Remoções</p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Entrar
              </Button>
            </Link>
            <Link href="#cotacao">
              <Button size="sm" className="hidden sm:inline-flex">
                Solicitar Cotação
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <a href="#cotacao" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Solicitar Cotação
                  </Button>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
