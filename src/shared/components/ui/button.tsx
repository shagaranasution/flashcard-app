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
          'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' &&
            'bg-brown-950 text-white hover:bg-brown-700 focus-visible:outline-brown-950',
          variant === 'secondary' &&
            'bg-yellow-500 text-brown-950 hover:brightness-95 focus-visible:outline-yellow-500',
          variant === 'danger' &&
            'bg-pink-700 text-white hover:brightness-95 focus-visible:outline-pink-700',
          variant === 'ghost' &&
            'bg-transparent text-brown-700 hover:bg-cream-100 focus-visible:outline-brown-700',
          className
        )}
        {...props}
      />
    );
  }
);
