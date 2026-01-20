
import React, { useState } from 'react';
import { Card, Button, Input } from './UI';
import { Icons } from './Icons';
import { WEBHOOKS } from '../constants';
import { User, WebhookResponse } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("Iniciando tentativa de login em:", WEBHOOKS.login);
      
      const response = await fetch(WEBHOOKS.login, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          senha: password,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }

      let data = await response.json();
      console.log("Resposta bruta do login:", data);
      
      // Normalização: n8n retorna frequentemente arrays de objetos
      if (Array.isArray(data)) {
        data = data[0];
      }

      const responseData = data as WebhookResponse;
      
      // Verificação flexível de sucesso (status 'ok', 'success' ou presença de dados do usuário)
      const isSuccess = 
        responseData.status?.toLowerCase() === 'ok' || 
        responseData.status?.toLowerCase() === 'success' ||
        (responseData.nome && responseData.role);

      if (isSuccess) {
        onLogin({
          email: email.trim(),
          senha: password,
          nome: responseData.nome || email.split('@')[0],
          role: responseData.role || 'gestor' // Default para gestor conforme sua indicação
        });
      } else {
        setError(responseData.message || 'Falha na autenticação. Verifique seu e-mail e senha de gestor.');
      }
    } catch (err: any) {
      console.error("Erro crítico no login:", err);
      setError(`Erro de conexão: ${err.message}. Verifique se o n8n está online e se as permissões de CORS estão configuradas.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/5">
            <Icons.Target />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-1">Teste D.I.S.C.</h1>
          <p className="text-green-500 font-medium mb-3 tracking-widest uppercase text-xs">by Edilson Morais</p>
          <p className="text-slate-400">Acesse a plataforma de análise comportamental e temperamentos.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="E-mail de Gestor"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gestor@empresa.com"
              icon={<Icons.User />}
              required
              autoComplete="email"
            />
            <Input
              label="Chave de Acesso"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Icons.Lock />}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-start gap-3 animate-pulse">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full py-4 text-lg">
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Autenticando...</span>
                </div>
              ) : "Entrar como Gestor"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-slate-500 text-xs mt-8">
          © 2024 Edilson Morais • Estratégia e Alta Performance
        </p>
      </div>
    </div>
  );
};
