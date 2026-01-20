
import React, { useState } from 'react';
import { Card, Button, Input } from './UI';
import { Icons } from './Icons';
import { EmployeeInfo } from '../types';

interface EmployeeInfoScreenProps {
  onStart: (info: EmployeeInfo) => void;
  onBack: () => void;
}

export const EmployeeInfoScreen: React.FC<EmployeeInfoScreenProps> = ({ onStart, onBack }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && email.trim() && area.trim()) {
      onStart({ 
        nome: nome.trim(), 
        email: email.trim(),
        area: area.trim()
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,197,94,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-md animate-fade-in">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <div className="rotate-180"><Icons.Logout /></div>
          <span className="text-sm font-medium">Voltar ao Login</span>
        </button>

        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Quem está sendo avaliado?</h1>
          <p className="text-slate-400">Insira os dados do colaborador para iniciar o diagnóstico comportamental.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome Completo do Funcionário"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João Silva"
              icon={<Icons.User />}
              required
            />
            <Input
              label="E-mail do Funcionário"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="funcionario@empresa.com"
              icon={<Icons.User />}
              required
            />
            <Input
              label="Área de Atuação"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex: Vendas, RH, TI..."
              icon={<Icons.Target />}
              required
            />

            <Button type="submit" className="w-full py-4 text-lg mt-4">
              Iniciar Teste DISC
              <Icons.Check />
            </Button>
          </form>
        </Card>

        <div className="mt-12 p-4 rounded-2xl bg-slate-900/30 border border-white/5 flex items-start gap-4">
          <div className="p-2 bg-green-500/10 rounded-lg text-green-500 shrink-0">
            <Icons.Target />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Os dados coletados serão utilizados exclusivamente para a geração do perfil DISC e temperamentos, sendo armazenados sob as diretrizes de privacidade da empresa.
          </p>
        </div>
      </div>
    </div>
  );
};
