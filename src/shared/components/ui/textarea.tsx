import { cn } from '@/shared/lib/cn';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  id,
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={textareaId} className="text-sm font-bold text-brown-950">
        {label}
      </label>

      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'min-h-28 w-full resize-y rounded-xl border border-brown-950/20 bg-white px-4 py-3 text-sm font-medium text-brown-950',
          'placeholder:text-brown-700/50',
          'focus:border-brown-950 focus:outline-none focus:ring-2 focus:ring-yellow-500/40',
          error &&
            'border-pink-700 focus:border-pink-700 focus:ring-pink-700/20',
          className
        )}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-sm text-pink-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
