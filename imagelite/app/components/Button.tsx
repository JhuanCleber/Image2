import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-green-500 to-yellow-400 text-green-950 hover:brightness-110',
  secondary: 'bg-green-800 text-white hover:bg-green-700',
  danger: 'bg-red-500 text-white hover:bg-red-700',
};

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-10 rounded px-4 py-2 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}