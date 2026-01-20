
import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { EmployeeInfoScreen } from './components/EmployeeInfoScreen';
import { TestScreen } from './components/TestScreen';
import { ThankYouScreen } from './components/ThankYouScreen';
import { EmployeeResultView, ManagerResultView } from './components/ResultViews';
import { AppScreen, User, EmployeeInfo, APIResult, EmployeeResult, ManagerResult } from './types';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<EmployeeInfo | null>(null);
  const [result, setResult] = useState<APIResult | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setScreen('employee_info');
  };

  const handleStartTest = (employeeData: EmployeeInfo) => {
    setEmployee(employeeData);
    setScreen('test');
  };

  const handleComplete = (analysis: APIResult) => {
    setResult(analysis);
    setScreen('result');
  };

  const handleEndSession = () => {
    setScreen('thank_you');
  };

  const handleRestart = () => {
    setEmployee(null);
    setResult(null);
    setScreen('employee_info');
  };

  const handleLogout = () => {
    setUser(null);
    setEmployee(null);
    setResult(null);
    setScreen('login');
  };

  const isEmployeeResult = (res: APIResult): res is EmployeeResult => {
    return (res as EmployeeResult).mensagem_contexto !== undefined;
  };

  return (
    <div className="min-h-screen">
      {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
      
      {screen === 'employee_info' && user && (
        <EmployeeInfoScreen 
          onStart={handleStartTest} 
          onBack={handleLogout} 
        />
      )}
      
      {screen === 'test' && user && employee && (
        <TestScreen 
          user={user} 
          employee={employee} 
          onComplete={handleComplete} 
        />
      )}

      {screen === 'result' && user && result && (
        <div className="py-10">
          {isEmployeeResult(result) ? (
            <EmployeeResultView 
              result={result} 
              user={user} 
              onLogout={handleLogout} 
              onEndSession={handleEndSession}
            />
          ) : (
            <ManagerResultView 
              result={result as ManagerResult} 
              user={user} 
              onLogout={handleLogout} 
              onEndSession={handleEndSession}
            />
          )}
        </div>
      )}

      {screen === 'thank_you' && employee && (
        <ThankYouScreen 
          employeeName={employee.nome} 
          onRestart={handleRestart} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}
