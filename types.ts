
export type AppScreen = 'login' | 'employee_info' | 'test' | 'loading' | 'result' | 'thank_you';

export interface User {
  nome: string;
  email: string;
  senha?: string;
  role: 'funcionario' | 'gestor' | string;
}

export interface EmployeeInfo {
  nome: string;
  email: string;
  area: string;
}

export interface Question {
  numero: number;
  pergunta: string;
  opcoes: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface EmployeeResult {
  mensagem_contexto: string;
  feedback_positivo: string;
  dica_pratica: string;
}

export interface ManagerResult {
  perfil_disc_dominante: string;
  temperamento_dominante: string;
  estilo_comportamental: string;
  diagnostico_resumo: string;
  comunicacao_ideal: string;
  comunicacao_evitar: string;
  acao_1: string;
  acao_2: string;
  acao_3: string;
}

export type APIResult = EmployeeResult | ManagerResult;

export interface WebhookResponse {
  status?: string;
  message?: string;
  nome?: string;
  role?: string;
  output?: string | APIResult;
}
