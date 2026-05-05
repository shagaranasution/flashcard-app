import { cn } from '@/shared/lib/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 5,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs font-bold text-brown-700">
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
      ) : null}

      <div className="h-2 overflow-hidden rounded-full bg-white ring-1 ring-brown-950/30">
        <div
          className="h-full rounded-full bg-brown-950 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
