import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', children, fullWidth = false, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 disabled:opacity-50 font-sans font-semibold";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] rounded-full px-6 py-3",
    secondary: "border-2 border-[var(--color-secondary)] text-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary)] hover:text-white rounded-full px-6 py-3",
    tertiary: "text-[var(--color-primary)] hover:underline underline-offset-4 px-4 py-2"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
