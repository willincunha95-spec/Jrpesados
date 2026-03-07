"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, LayoutDashboard, History, LogOut, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#cotacao", label: "Orçamento" },
  { href: "#trabalhe-conosco", label: "Trabalhe Conosco" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout, isAdmin, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
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
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+5511958572567" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">(11) 95857-2567</span>
            </a>
            <span className="hidden md:inline text-primary-foreground/60">|</span>
            <span className="hidden md:inline text-primary-foreground/80">Atendimento em todo Brasil</span>
          </div>
          <div className="flex items-center gap-4">
            {!loading && !user && (
              <Link href="/login" className="hover:text-accent transition-colors">
                Área do Cliente
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-background shadow-lg" 
            : "bg-background/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="JR Transportes"
                width={56}
                height={56}
                className="rounded-lg"
              />
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">JR Transportes</h1>
                <p className="text-xs text-muted-foreground tracking-wide">Logística & Remoções</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!loading && user && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.email.split("@")[0]}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-border">
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
              )}
              
              <a href="#cotacao" className="hidden sm:block">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
                  Solicitar Orçamento
                </Button>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-6 border-t border-border bg-background">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border">
                  {!loading && user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
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
                        Área do Cliente
                      </Button>
                    </Link>
                  )}
                  <a href="#cotacao" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Solicitar Orçamento
                    </Button>
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
