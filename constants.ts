
import { Question } from './types';

export const WEBHOOKS = {
  // Webhook exclusivo para autenticação e verificação de perfil
  login: 'https://edilson-dark-n8n.7lvlou.easypanel.host/webhook/mentor_login',
  
  // Webhook para processamento das respostas e geração do diagnóstico DISC
  disc: 'https://edilson-dark-n8n.7lvlou.easypanel.host/webhook/disc-temperamento'
};

export const PERGUNTAS: Question[] = [
  {
    numero: 1,
    pergunta: "Em uma reunião de equipe, você geralmente...",
    opcoes: {
      A: "Toma a liderança e direciona a discussão",
      B: "Anima o grupo e propõe ideias criativas",
      C: "Ouve atentamente e busca consenso",
      D: "Analisa os dados antes de opinar"
    }
  },
  {
    numero: 2,
    pergunta: "Quando surge um problema urgente, você...",
    opcoes: {
      A: "Age imediatamente para resolver",
      B: "Reúne a equipe para discutir soluções",
      C: "Mantém a calma e avalia as opções",
      D: "Investiga a causa raiz antes de agir"
    }
  },
  {
    numero: 3,
    pergunta: "O que mais te motiva no trabalho?",
    opcoes: {
      A: "Desafios e resultados",
      B: "Reconhecimento e interação social",
      C: "Estabilidade e trabalho em equipe",
      D: "Qualidade e processos bem definidos"
    }
  },
  {
    numero: 4,
    pergunta: "Como você prefere receber feedback?",
    opcoes: {
      A: "Direto e objetivo, sem rodeios",
      B: "De forma positiva e encorajadora",
      C: "Com calma e em particular",
      D: "Detalhado e com exemplos específicos"
    }
  },
  {
    numero: 5,
    pergunta: "Em um projeto novo, você primeiro...",
    opcoes: {
      A: "Define metas e prazos agressivos",
      B: "Compartilha a ideia com todos empolgado",
      C: "Consulta a equipe para alinhar expectativas",
      D: "Planeja cada etapa detalhadamente"
    }
  },
  {
    numero: 6,
    pergunta: "Quando discorda de alguém, você...",
    opcoes: {
      A: "Fala diretamente sua opinião",
      B: "Tenta convencer com entusiasmo",
      C: "Evita conflito e busca meio-termo",
      D: "Apresenta fatos e dados para argumentar"
    }
  },
  {
    numero: 7,
    pergunta: "O que te irrita no ambiente de trabalho?",
    opcoes: {
      A: "Lentidão e falta de decisão",
      B: "Ambiente negativo e sem energia",
      C: "Mudanças bruscas e conflitos",
      D: "Desorganização e falta de padrão"
    }
  },
  {
    numero: 8,
    pergunta: "Como você lida com prazos apertados?",
    opcoes: {
      A: "Acelera e cobra resultados",
      B: "Motiva a equipe a se unir",
      C: "Trabalha de forma constante e estável",
      D: "Organiza prioridades metodicamente"
    }
  },
  {
    numero: 9,
    pergunta: "Seu estilo de comunicação é mais...",
    opcoes: {
      A: "Direto e focado em resultados",
      B: "Expressivo e persuasivo",
      C: "Calmo e acolhedor",
      D: "Preciso e detalhado"
    }
  },
  {
    numero: 10,
    pergunta: "O que você mais valoriza em um líder?",
    opcoes: {
      A: "Decisão rápida e foco em metas",
      B: "Carisma e capacidade de inspirar",
      C: "Empatia e apoio à equipe",
      D: "Competência técnica e organização"
    }
  },
  {
    numero: 11,
    pergunta: "Quando trabalha em equipe, você...",
    opcoes: {
      A: "Assume o controle naturalmente",
      B: "Conecta as pessoas e cria clima positivo",
      C: "Apoia os colegas e mantém harmonia",
      D: "Garante que os processos sejam seguidos"
    }
  },
  {
    numero: 12,
    pergunta: "Como você celebra uma conquista?",
    opcoes: {
      A: "Já foca no próximo desafio",
      B: "Comemora com todos animadamente",
      C: "Agradece à equipe discretamente",
      D: "Analisa o que funcionou para replicar"
    }
  },
  {
    numero: 13,
    pergunta: "Diante de uma mudança inesperada, você...",
    opcoes: {
      A: "Adapta rápido e segue em frente",
      B: "Vê como oportunidade e engaja outros",
      C: "Precisa de tempo para se ajustar",
      D: "Questiona os motivos e planeja a transição"
    }
  },
  {
    numero: 14,
    pergunta: "O que te descreve melhor?",
    opcoes: {
      A: "Competitivo e determinado",
      B: "Comunicativo e otimista",
      C: "Paciente e confiável",
      D: "Analítico e perfeccionista"
    }
  },
  {
    numero: 15,
    pergunta: "Seu maior ponto forte é...",
    opcoes: {
      A: "Fazer acontecer e entregar resultados",
      B: "Influenciar e motivar pessoas",
      C: "Criar ambiente estável e colaborativo",
      D: "Garantir qualidade e precisão"
    }
  }
];
