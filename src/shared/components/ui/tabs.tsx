import { cn } from '@/shared/lib/cn';

interface TabItem<TValue extends string> {
  label: string;
  value: TValue;
}

interface TabsProps<TValue extends string> {
  items: TabItem<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
}

export function Tabs<TValue extends string>({
  items,
  value,
  onChange,
}: TabsProps<TValue>) {
  return (
    <div className="inline-flex rounded-2xl bg-white p-1">
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-bold transition',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500',
              isActive
                ? 'bg-yellow-500 text-brown-950'
                : 'text-brown-950 hover:text-white'
            )}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
