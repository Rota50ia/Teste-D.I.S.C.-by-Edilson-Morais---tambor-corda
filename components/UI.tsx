
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass rounded-3xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }> = ({ children, variant = 'primary', className = "", ...props }) => {
  const baseStyles = "px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 active:scale-[0.98]",
    outline: "border border-white/10 hover:bg-white/5 text-slate-300"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; icon?: React.ReactNode }> = ({ label, icon, className = "", ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>}
      <input
        className={`w-full bg-slate-900/50 border border-white/10 rounded-xl py-3.5 pr-4 ${icon ? 'pl-12' : 'pl-4'} text-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  </div>
);
