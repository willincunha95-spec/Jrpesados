"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cotacao", label: "Cotação" },
  { href: "#trabalhe-conosco", label: "Trabalhe Conosco" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const { user, logout, isAdmin } = useAuth()

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

          <div className="relative flex items-center gap-3">
            {!user ? (
              <>
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
              </>
            ) : (
              <div>
                <button
                  onClick={() => setOpenProfile((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm"
                >
                  <span className="font-medium">{user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openProfile && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg p-1">
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary font-medium"
                      >
                        Painel Admin
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/portal/locacoes"
                          className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary"
                        >
                          Histórico de Locações
                        </Link>
                        <Link
                          href="/portal/rastreio"
                          className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary"
                        >
                          Rastreio
                        </Link>
                      </>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}

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
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                {!user ? (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="lg" className="w-full">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="#cotacao" onClick={() => setIsMenuOpen(false)}>
                      <Button size="lg" className="w-full">
                        Solicitar Cotação
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 bg-secondary/50 rounded-lg mb-2">
                      <p className="text-xs text-muted-foreground">Logado como</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    {isAdmin ? (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-3 rounded-md text-base text-foreground hover:bg-secondary border-b border-border/50 font-medium"
                      >
                        Acessar Painel Admin
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/portal/locacoes"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-3 rounded-md text-base text-foreground hover:bg-secondary border-b border-border/50"
                        >
                          Histórico de Locações
                        </Link>
                        <Link
                          href="/portal/rastreio"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-3 rounded-md text-base text-foreground hover:bg-secondary border-b border-border/50"
                        >
                          Rastreio
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-3 rounded-md text-base text-destructive hover:bg-destructive/10"
                    >
                      Sair da conta
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
