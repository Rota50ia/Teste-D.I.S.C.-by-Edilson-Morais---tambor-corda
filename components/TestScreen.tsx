
import React, { useState } from 'react';
import { Card, Button } from './UI';
import { Icons } from './Icons';
import { PERGUNTAS, WEBHOOKS } from '../constants';
import { User, EmployeeInfo, APIResult } from '../types';

interface TestScreenProps {
  user: User;
  employee: EmployeeInfo;
  onComplete: (result: APIResult) => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({ user, employee, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = PERGUNTAS[currentIdx];
  const progress = (currentIdx / PERGUNTAS.length) * 100;

  const handleNext = async () => {
    if (!selected) return;
    
    const newAnswers = [...answers, selected];
    
    if (currentIdx < PERGUNTAS.length - 1) {
      setAnswers(newAnswers);
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      setAnswers(newAnswers);
      setIsSubmitting(true);
      
      try {
        console.log("🚀 Enviando dados para o Webhook DISC:", WEBHOOKS.disc);
        
        const payload = {
          gestor: { 
            nome: user.nome, 
            email: user.email 
          },
          funcionario: {
            nome: employee.nome,
            email: employee.email,
            area: employee.area
          },
          contexto: { 
            origem: "App_Web_React",
            timestamp: new Date().toISOString(),
            total_perguntas: PERGUNTAS.length 
          },
          respostas: newAnswers
        };

        const response = await fetch(WEBHOOKS.disc, {
          method: 'POST',
          mode: 'cors',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const rawText = await response.text();
        console.log("📥 Resposta bruta do servidor:", rawText);

        if (!rawText || rawText.trim() === "") {
          throw new Error("O servidor retornou uma resposta vazia.");
        }

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          throw new Error("A resposta do servidor não é um JSON válido.");
        }
        
        if (Array.isArray(data)) {
          data = data[0];
        }

        if (!data) {
          throw new Error("Dados inválidos recebidos do servidor.");
        }

        let finalResult: APIResult;
        const output = data.output !== undefined ? data.output : data;

        if (typeof output === 'string') {
          try {
            finalResult = JSON.parse(output);
          } catch {
            throw new Error("O campo 'output' contém uma string que não é um JSON válido.");
          }
        } else {
          finalResult = output;
        }

        console.log("✅ Processamento concluído com sucesso:", finalResult);
        onComplete(finalResult);
        
      } catch (err: any) {
        console.error("❌ Erro crítico no envio do DISC:", err);
        alert(`Não foi possível gerar o diagnóstico: ${err.message}\n\nVerifique se o Webhook no n8n está ativo.`);
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-pulse">
        <div className="w-24 h-24 relative mb-8">
          <div className="absolute inset-0 border-4 border-green-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-green-500">
            <Icons.Sparkles />
          </div>
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Calculando Perfil</h2>
        <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
          Processando respostas de {employee.nome}...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 pt-12">
      <header className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-green-500 font-bold text-xs tracking-widest uppercase">Funcionário: {employee.nome} ({employee.area})</span>
            <h1 className="font-display text-3xl font-bold text-white mt-1">Sessão de Autoconhecimento</h1>
          </div>
          <span className="text-slate-500 font-medium text-sm">Progresso: {Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="animate-fade-in" key={currentIdx}>
        <Card className="mb-8 border-white/5 bg-slate-900/40 backdrop-blur-sm">
          <p className="text-green-500/60 font-bold mb-4 text-xs uppercase tracking-tighter">Questão {currentIdx + 1} de {PERGUNTAS.length}</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed">
            {currentQuestion.pergunta}
          </h2>

          <div className="grid gap-4">
            {Object.entries(currentQuestion.opcoes).map(([key, text]) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`flex items-center gap-5 p-6 rounded-2xl border-2 text-left transition-all duration-300 group
                  ${selected === key 
                    ? 'border-green-500 bg-green-500/10 ring-8 ring-green-500/5' 
                    : 'border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-900/60'}`}
              >
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner
                  ${selected === key ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 transition-colors'}`}>
                  {key}
                </div>
                <span className={`text-lg font-medium leading-snug ${selected === key ? 'text-white' : 'text-slate-300'}`}>
                  {text}
                </span>
                {selected === key && (
                  <div className="ml-auto text-green-500">
                    <Icons.Check />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-slate-500 text-sm italic">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Respondendo como {employee.nome}
          </div>
          <Button 
            onClick={handleNext} 
            disabled={!selected}
            className="w-full md:w-auto px-12 py-5 shadow-2xl shadow-green-500/20"
          >
            {currentIdx === PERGUNTAS.length - 1 ? "Ver meu Diagnóstico" : "Próxima Pergunta"}
          </Button>
        </div>
      </div>
    </div>
  );
};
