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
      <label
        htmlFor={textareaId}
        className="text-sm font-semibold text-slate-900">
        {label}
      </label>

      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900',
          'placeholder:text-slate-400',
          'focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
          className
        )}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
