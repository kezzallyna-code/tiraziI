import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={inputId} className="text-label-md text-text-primary uppercase tracking-wide">
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-md bg-surface border-2 outline-none transition-colors duration-200
          text-body-md text-text-primary placeholder-text-secondary
          ${error ? 'border-accent' : 'border-[#E8DED3] focus:border-primary'}
        `}
        {...props}
      />
      {error && <span className="text-sm text-accent">{error}</span>}
    </div>
  );
}
