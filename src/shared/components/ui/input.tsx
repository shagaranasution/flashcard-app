import { cn } from '@/shared/lib/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ id, label, error, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-bold text-brown-950">
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'w-full rounded-xl border border-brown-950/20 bg-white px-4 py-3 text-sm font-medium text-brown-950',
          'placeholder:text-brown-700/50',
          'focus:border-brown-950 focus:outline-none focus:ring-2 focus:ring-yellow-500/40',
          error &&
            'border-pink-700 focus:border-pink-700 focus:ring-pink-700/20',
          className
        )}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-sm text-pink-700">
          {error}
        </p>
      )}
    </div>
  );
}
