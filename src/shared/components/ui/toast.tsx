import type { Toast } from '@/shared/hooks/use-toast';

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <p>{toast.message}</p>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-white/70 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Dismiss notification">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
