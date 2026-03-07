const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Types based on Java DTOs
export interface Equipamento {
  id: number
  nome: string
  marca: string
  modelo: string
  numeroSerie: string
  valorDiaria: number
  status: "DISPONIVEL" | "LOCADO" | "MANUTENCAO"
}

export interface CotacaoRequest {
  nome: string
  empresa: string
  telefone: string
  tipoServico: string
  mensagem: string
}

export interface Candidato {
  nome: string
  email: string
  telefone: string
  cargoPretendido: string
  linkCurriculo: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  role?: "CLIENT" | "ADMIN" | "MECANIC"
}

export interface PerfilCliente {
  equipamentosAlugados: EquipamentoResumo[]
  encomendasAtivas: EncomendaResumo[]
}

export interface EquipamentoResumo {
  id: number
  nome: string
  modelo: string
  status: string
}

export interface EncomendaResumo {
  id: number
  descricao: string
  status: string
  previsaoEntrega: string
}

export interface VeiculoRastreio {
  id: number
  placa: string
  latitude: number
  longitude: number
  urlVideo?: string
}

export interface RotaMotorista {
  veiculoId: number
  origem: string
  destino: string
  paradas: string[]
  distanciaKm: number
  tempoEstimado: string
}

export interface DashboardAdmin {
  faturamentoMensal: number
  totalVeiculos: number
  veiculosEmRota: number
  locacoesAtivas: number
}

// Função para fazer requisições autenticadas
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response
}

// Public endpoints
export async function getCatalogo(): Promise<Equipamento[]> {
  const res = await fetch(`${API_BASE_URL}/equipamentos/catalogo`)
  if (!res.ok) throw new Error("Falha ao carregar catálogo")
  return res.json()
}

export async function enviarCotacao(data: CotacaoRequest): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/leads/solicitar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Falha ao enviar cotação")
  return res.text()
}

export async function enviarCurriculo(data: Candidato): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/trabalhe-conosco`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Falha ao enviar currículo")
  return res.text()
}

// Auth endpoints
export async function login(data: LoginRequest): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Credenciais inválidas")
  const token = await res.text()
  localStorage.setItem("token", token)
  return token
}

export async function register(data: RegisterRequest): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Falha no cadastro")
}

// Client endpoints (authenticated)
export async function getMeuPerfil(): Promise<PerfilCliente> {
  const res = await fetchWithAuth("/veiculos/meu-perfil")
  return res.json()
}

export async function getMeusRastreios(): Promise<VeiculoRastreio[]> {
  const res = await fetchWithAuth("/veiculos/meus-rastreios")
  return res.json()
}

// Admin endpoints (authenticated)
export async function getDashboardAdmin(): Promise<DashboardAdmin> {
  const res = await fetchWithAuth("/veiculos/admin/dashboard")
  return res.json()
}

export async function getRotaMotorista(veiculoId: number): Promise<RotaMotorista> {
  const res = await fetchWithAuth(`/veiculos/${veiculoId}/rota-motorista`)
  return res.json()
}

export async function atualizarStatusCarga(
  veiculoId: number,
  novoStatus: string,
  previsao: string
): Promise<string> {
  const res = await fetchWithAuth(
    `/veiculos/${veiculoId}/status?novoStatus=${novoStatus}&previsao=${previsao}`,
    { method: "PATCH" }
  )
  return res.text()
}

export async function getVeiculos() {
  const res = await fetchWithAuth("/veiculos")
  return res.json()
}

export async function getEquipamentos(): Promise<Equipamento[]> {
  const res = await fetchWithAuth("/equipamentos")
  return res.json()
}

export async function getCandidatos(): Promise<Candidato[]> {
  const res = await fetchWithAuth("/trabalhe-conosco")
  return res.json()
}

export async function getDashboardResumo() {
  const res = await fetchWithAuth("/dashboard/resumo")
  return res.json()
}

// Helper to decode JWT and get user role
export function getUserFromToken(): { email: string; role: string } | null {
  if (typeof window === "undefined") return null
  
  const token = localStorage.getItem("token")
  if (!token) return null
  
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return {
      email: payload.sub,
      role: payload.role || "CLIENT",
    }
  } catch {
    return null
  }
}

export function logout() {
  localStorage.removeItem("token")
}
