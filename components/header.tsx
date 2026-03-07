"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, LayoutDashboard, History, LogOut, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cotacao", label: "Cotação" },
  { href: "#trabalhe-conosco", label: "Carreiras" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout, isAdmin, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.jpg"
              alt="JR Pesados"
              width={48}
              height={48}
              className="rounded-full ring-2 ring-border group-hover:ring-accent transition-all"
            />
            <div className="hidden sm:block">
              <h1 className="font-display text-xl text-foreground tracking-tight">JR Pesados</h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Transportes</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                        {user.email.split("@")[0]}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-secondary/50">
                          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                          <p className="text-xs text-muted-foreground capitalize mt-0.5">{user.role.toLowerCase()}</p>
                        </div>
                        
                        <div className="py-2">
                          {isAdmin ? (
                            <Link
                              href="/admin"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            >
                              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                              Acessar Dashboard
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
                                Rastreamento
                              </Link>
                            </>
                          )}
                        </div>
                        
                        <div className="border-t border-border pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                          >
                            <LogOut className="h-4 w-4" />
                            Sair da conta
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      Entrar
                    </Button>
                  </Link>
                )}
              </>
            )}
            
            <a href="#cotacao" className="hidden sm:block">
              <Button size="sm" className="rounded-full px-5 gap-2 group">
                Cotação
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-2">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user.email.split("@")[0]}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
                          </div>
                        </div>
                        {isAdmin ? (
                          <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                              <LayoutDashboard className="h-4 w-4" />
                              Acessar Dashboard
                            </Button>
                          </Link>
                        ) : (
                          <Link href="/portal" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                              <LayoutDashboard className="h-4 w-4" />
                              Meu Portal
                            </Button>
                          </Link>
                        )}
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2 text-destructive"
                          onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        >
                          <LogOut className="h-4 w-4" />
                          Sair
                        </Button>
                      </>
                    ) : (
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Entrar
                        </Button>
                      </Link>
                    )}
                  </>
                )}
                <a href="#cotacao" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
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
