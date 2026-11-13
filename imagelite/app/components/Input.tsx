import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-white/80">{label}</span>
      <input
        className={`h-10 rounded border border-yellow-400/40 bg-green-900/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-yellow-400 ${className ?? ''}`}
        {...props}
      />
    </label>
  );
}