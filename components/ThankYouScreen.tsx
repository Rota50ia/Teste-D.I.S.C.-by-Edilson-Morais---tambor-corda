
import React from 'react';
import { Card, Button } from './UI';
import { Icons } from './Icons';

interface ThankYouScreenProps {
  onRestart: () => void;
  onLogout: () => void;
  employeeName: string;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onRestart, onLogout, employeeName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-lg text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/10 scale-110">
          <div className="text-green-500 scale-150">
            <Icons.Check />
          </div>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Obrigado por participar!
        </h1>
        
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          O teste D.I.S.C. de <span className="text-green-400 font-bold">{employeeName}</span> foi concluído com sucesso. 
          As respostas foram processadas e o diagnóstico estratégico já está disponível para sua gestão.
        </p>

        <Card className="mb-10 bg-slate-900/40 border-white/5">
          <p className="text-slate-400 text-sm italic">
            "O autoconhecimento é o primeiro passo para a alta performance e o domínio da própria carreira."
          </p>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} className="py-4 px-8">
            <Icons.Target />
            Nova Avaliação
          </Button>
          <Button variant="outline" onClick={onLogout} className="py-4 px-8">
            <Icons.Logout />
            Sair do Painel
          </Button>
        </div>

        <p className="text-slate-600 text-xs mt-16 uppercase tracking-[0.2em] font-bold">
          Estratégia e Alta Performance • Edilson Morais
        </p>
      </div>
    </div>
  );
};
