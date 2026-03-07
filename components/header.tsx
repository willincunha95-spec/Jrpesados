"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, LayoutDashboard, History, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cotacao", label: "Cotação" },
  { href: "#trabalhe-conosco", label: "Trabalhe Conosco" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout, isAdmin, loading } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

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
            {!loading && (
              <>
                {user ? (
                  // User is logged in - show profile dropdown
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                        {user.email.split("@")[0]}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        
                        {isAdmin ? (
                          <Link
                            href="/admin"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            Aceder Dashboard
                          </Link>
                        ) : (
                          <>
                            <Link
                              href="/portal"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                              Meu Portal
                            </Link>
                            <Link
                              href="/portal/rastreio"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              <History className="h-4 w-4 text-muted-foreground" />
                              Histórico / Rastreio
                            </Link>
                          </>
                        )}
                        
                        <div className="border-t border-border mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                          >
                            <LogOut className="h-4 w-4" />
                            Sair
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // User not logged in - show login button
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                      Entrar
                    </Button>
                  </Link>
                )}
              </>
            )}
            
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
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 px-2 py-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{user.email.split("@")[0]}</span>
                        </div>
                        {isAdmin ? (
                          <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                              <LayoutDashboard className="h-4 w-4" />
                              Aceder Dashboard
                            </Button>
                          </Link>
                        ) : (
                          <>
                            <Link href="/portal" onClick={() => setIsMenuOpen(false)}>
                              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                Meu Portal
                              </Button>
                            </Link>
                            <Link href="/portal/rastreio" onClick={() => setIsMenuOpen(false)}>
                              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                <History className="h-4 w-4" />
                                Histórico / Rastreio
                              </Button>
                            </Link>
                          </>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                          onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        >
                          <LogOut className="h-4 w-4" />
                          Sair
                        </Button>
                      </>
                    ) : (
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">
                          Entrar
                        </Button>
                      </Link>
                    )}
                  </>
                )}
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
