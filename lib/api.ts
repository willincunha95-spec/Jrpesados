const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // Adiciona o token de autenticação se necessário
  if (requiresAuth) {
    const token = localStorage.getItem("jrpesados_token");
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    // Se o token expirou, limpa o localStorage e redireciona para login
    if (response.status === 401) {
      localStorage.removeItem("jrpesados_token");
      localStorage.removeItem("jrpesados_user");
      window.location.href = "/login";
      throw new Error("Sessão expirada. Por favor, faça login novamente.");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return response.json();
}

// Funções de conveniência para diferentes métodos HTTP
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
