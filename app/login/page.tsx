"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Truck, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia exatamente 'email' e 'password' para o backend
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem de fundo */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/images/hero-trucks.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-12 h-12 text-secondary" />
            <div>
              <span className="text-4xl font-bold text-white">JR</span>
              <span className="text-2xl font-semibold text-white/90 ml-2">
                Pesados
              </span>
            </div>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Transporte de Cargas Pesadas com Excelência
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            Acesse sua área de cliente para acompanhar suas locações e rastrear
            suas encomendas em tempo real.
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Truck className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold text-primary">JR</span>
            <span className="text-xl font-semibold text-foreground">
              Pesados
            </span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-muted-foreground">
                  Lembrar-me
                </span>
              </label>
              <Link
                href="/recuperar-senha"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Esqueci a senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link
              href="/cadastro"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Cadastre-se
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-border">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
