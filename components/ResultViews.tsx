
import React from 'react';
import { Card, Button } from './UI';
import { Icons } from './Icons';
import { User, APIResult, EmployeeResult, ManagerResult } from '../types';

interface ResultProps {
  result: APIResult;
  user: User;
  onLogout: () => void;
  onEndSession: () => void;
}

export const EmployeeResultView: React.FC<{ result: EmployeeResult } & ResultProps> = ({ result, user, onLogout, onEndSession }) => (
  <div className="max-w-3xl mx-auto p-6 animate-fade-in">
    <div className="flex justify-between items-center mb-10">
      <h1 className="font-display text-2xl font-bold text-white">Seu Mapa de Desenvolvimento</h1>
      <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors" title="Sair do Sistema"><Icons.Logout /></button>
    </div>

    <Card className="mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      <div className="flex gap-6">
        <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0 text-green-500">
          <Icons.Star />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl mb-3">Estilo Comportamental</h2>
          <p className="text-slate-300 leading-relaxed">{result.mensagem_contexto}</p>
        </div>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <Card className="border-emerald-500/20">
        <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
          <Icons.Check /> Forças em Destaque
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{result.feedback_positivo}</p>
      </Card>
      
      <Card className="border-amber-500/20">
        <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
          <Icons.Target /> Próximo Passo
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{result.dica_pratica}</p>
      </Card>
    </div>

    <div className="flex justify-center pt-6 border-t border-white/5">
      <Button onClick={onEndSession} className="px-12 py-5 shadow-2xl shadow-green-500/20">
        ENCERRAR SEÇÃO
      </Button>
    </div>
  </div>
);

export const ManagerResultView: React.FC<{ result: ManagerResult } & ResultProps> = ({ result, user, onLogout, onEndSession }) => (
  <div className="max-w-5xl mx-auto p-6 animate-fade-in">
    <div className="flex justify-between items-center mb-12">
      <div>
        <p className="text-green-500 font-bold text-xs uppercase tracking-widest">Painel Estratégico</p>
        <h1 className="font-display text-3xl font-bold text-white">Análise de Liderança</h1>
      </div>
      <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors" title="Sair do Sistema"><Icons.Logout /></button>
    </div>

    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 flex gap-6">
        <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0 text-green-500">
          <Icons.Users />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-2">Diagnóstico Resumo</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{result.diagnostico_resumo}</p>
        </div>
      </Card>

      <Card className="bg-green-500/10 border-green-500/30">
        <p className="text-green-500 font-bold text-xs mb-1 uppercase">Perfil Dominante</p>
        <p className="font-display text-4xl text-white mb-4">{result.perfil_disc_dominante}</p>
        <hr className="border-white/10 mb-4" />
        <p className="text-slate-300 text-xs">Temperamento: <span className="text-white font-bold">{result.temperamento_dominante}</span></p>
      </Card>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">Canal de Comunicação Ideal</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{result.comunicacao_ideal}</p>
      </Card>
      <Card className="border-red-500/20">
        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">O que Evitar</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{result.comunicacao_evitar}</p>
      </Card>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[result.acao_1, result.acao_2, result.acao_3].map((acao, i) => (
        <Card key={i} className="border-white/5 relative">
          <span className="absolute top-4 right-6 text-slate-800 font-black text-4xl">{i+1}</span>
          <h4 className="text-slate-400 font-bold text-xs uppercase mb-3">Ação Recomendada</h4>
          <p className="text-slate-200 text-sm leading-relaxed">{acao}</p>
        </Card>
      ))}
    </div>

    <div className="flex justify-center pt-10 border-t border-white/5">
      <Button onClick={onEndSession} className="px-16 py-6 text-lg shadow-2xl shadow-green-500/20">
        ENCERRAR SEÇÃO
      </Button>
    </div>
  </div>
);
