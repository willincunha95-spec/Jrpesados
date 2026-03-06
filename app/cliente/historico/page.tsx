"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface Locacao {
  id: number;
  dataInicio: string;
  dataFim: string;
  origem: string;
  destino: string;
  tipoVeiculo: string;
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";
  valor: number;
}

const statusLabels = {
  PENDENTE: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  EM_ANDAMENTO: { label: "Em Andamento", color: "bg-blue-100 text-blue-800" },
  CONCLUIDA: { label: "Concluída", color: "bg-green-100 text-green-800" },
  CANCELADA: { label: "Cancelada", color: "bg-red-100 text-red-800" },
};

export default function HistoricoPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated) {
      fetchLocacoes();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchLocacoes = async () => {
    try {
      const data = await api.get<Locacao[]>("/api/locacoes/historico");
      setLocacoes(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar histórico"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-12 min-h-screen bg-muted">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Histórico de Locações
            </h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe todas as suas locações realizadas
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700">{error}</p>
              <button
                onClick={fetchLocacoes}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          ) : locacoes.length === 0 ? (
            <div className="bg-card rounded-xl shadow-sm p-12 text-center">
              <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma locação encontrada
              </h2>
              <p className="text-muted-foreground mb-6">
                Você ainda não realizou nenhuma locação conosco.
              </p>
              <Link
                href="/#contato"
                className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Solicitar Orçamento
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {locacoes.map((locacao) => (
                <div
                  key={locacao.id}
                  className="bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[locacao.status].color}`}
                        >
                          {statusLabels[locacao.status].label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          #{locacao.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Origem:</span>
                          <span className="font-medium">{locacao.origem}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">
                            Destino:
                          </span>
                          <span className="font-medium">{locacao.destino}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Período:
                          </span>
                          <span className="font-medium">
                            {new Date(locacao.dataInicio).toLocaleDateString(
                              "pt-BR"
                            )}{" "}
                            -{" "}
                            {new Date(locacao.dataFim).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Veículo:
                          </span>
                          <span className="font-medium">
                            {locacao.tipoVeiculo}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Valor Total
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(locacao.valor)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <WhatsAppButton />
    </>
  );
}
