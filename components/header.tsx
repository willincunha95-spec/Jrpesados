"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  History,
  Package,
  LogOut,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Truck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">JR</span>
            <span className="text-lg font-semibold text-foreground">
              Pesados
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isUserMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                    <Link
                      href="/cliente/historico"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <History className="w-4 h-4" />
                      Histórico de Locações
                    </Link>
                    <Link
                      href="/cliente/rastreio"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      Rastreio de Encomendas
                    </Link>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-muted transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Entrar
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && user ? (
                <>
                  <div className="border-t border-border my-2" />
                  <Link
                    href="/cliente/historico"
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <History className="w-4 h-4" />
                    Histórico de Locações
                  </Link>
                  <Link
                    href="/cliente/rastreio"
                    className="py-3 px-4 text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="w-4 h-4" />
                    Rastreio de Encomendas
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-3 px-4 text-red-600 hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-lg text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
