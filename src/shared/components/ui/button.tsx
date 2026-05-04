import { cn } from '@/shared/lib/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = 'primary', type = 'button', ...props }: ButtonProps,
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' &&
            'bg-slate-900 text-white hover:bg-slate-700 focus-visible:outline-slate-900',
          variant === 'secondary' &&
            'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-500',
          variant === 'danger' &&
            'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
          variant === 'ghost' &&
            'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-500',
          className
        )}
        {...props}
      />
    );
  }
);
