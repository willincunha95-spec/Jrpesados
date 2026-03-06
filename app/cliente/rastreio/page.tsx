"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  Loader2,
  Search,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface Encomenda {
  id: number;
  codigoRastreio: string;
  descricao: string;
  origem: string;
  destino: string;
  status: "COLETADO" | "EM_TRANSITO" | "ENTREGUE" | "AGUARDANDO";
  previsaoEntrega: string;
  historico: {
    data: string;
    local: string;
    descricao: string;
  }[];
}

const statusConfig = {
  AGUARDANDO: {
    label: "Aguardando Coleta",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  COLETADO: {
    label: "Coletado",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  EM_TRANSITO: {
    label: "Em Trânsito",
    color: "bg-indigo-100 text-indigo-800",
    icon: Truck,
  },
  ENTREGUE: {
    label: "Entregue",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
};

export default function RastreioPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState("");
  const [selectedEncomenda, setSelectedEncomenda] = useState<Encomenda | null>(
    null
  );

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated) {
      fetchEncomendas();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchEncomendas = async () => {
    try {
      const data = await api.get<Encomenda[]>("/api/encomendas/minhas");
      setEncomendas(data);
      if (data.length > 0) {
        setSelectedEncomenda(data[0]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar encomendas"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEncomendas = searchCode
    ? encomendas.filter((e) =>
        e.codigoRastreio.toLowerCase().includes(searchCode.toLowerCase())
      )
    : encomendas;

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
              Rastreio de Encomendas
            </h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe suas encomendas em tempo real
            </p>
          </div>

          {/* Campo de busca */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por código de rastreio..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700">{error}</p>
              <button
                onClick={fetchEncomendas}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          ) : filteredEncomendas.length === 0 ? (
            <div className="bg-card rounded-xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {searchCode
                  ? "Nenhuma encomenda encontrada"
                  : "Sem encomendas no momento"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {searchCode
                  ? "Verifique o código de rastreio e tente novamente."
                  : "Você não possui encomendas em andamento."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de encomendas */}
              <div className="lg:col-span-1 space-y-3">
                {filteredEncomendas.map((encomenda) => {
                  const StatusIcon = statusConfig[encomenda.status].icon;
                  return (
                    <button
                      key={encomenda.id}
                      onClick={() => setSelectedEncomenda(encomenda)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedEncomenda?.id === encomenda.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-card hover:bg-card/80 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <StatusIcon className="w-5 h-5" />
                        <span className="font-mono text-sm font-medium">
                          {encomenda.codigoRastreio}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          selectedEncomenda?.id === encomenda.id
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {encomenda.descricao}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Detalhes da encomenda */}
              {selectedEncomenda && (
                <div className="lg:col-span-2 bg-card rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {selectedEncomenda.descricao}
                      </h2>
                      <p className="text-sm text-muted-foreground font-mono">
                        {selectedEncomenda.codigoRastreio}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig[selectedEncomenda.status].color}`}
                    >
                      {statusConfig[selectedEncomenda.status].label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Origem</p>
                        <p className="font-medium">
                          {selectedEncomenda.origem}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Destino</p>
                        <p className="font-medium">
                          {selectedEncomenda.destino}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg mb-8">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Previsão de Entrega
                      </p>
                      <p className="font-semibold text-primary">
                        {new Date(
                          selectedEncomenda.previsaoEntrega
                        ).toLocaleDateString("pt-BR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Timeline do histórico */}
                  {selectedEncomenda.historico &&
                    selectedEncomenda.historico.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">
                          Histórico de Movimentação
                        </h3>
                        <div className="relative pl-6 border-l-2 border-border space-y-6">
                          {selectedEncomenda.historico.map((item, index) => (
                            <div key={index} className="relative">
                              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary border-2 border-background" />
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {item.descricao}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.local} -{" "}
                                  {new Date(item.data).toLocaleString("pt-BR")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <WhatsAppButton />
    </>
  );
}
