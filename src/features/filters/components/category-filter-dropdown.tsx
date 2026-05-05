import { useRef, useState } from 'react';
import type { CategoryCount } from '../utils/filter-utils';
import { Button } from '@/shared/components/ui/button';
import { useOnClickOutside } from '@/shared/hooks/use-on-click-outside';
import { useEscapeKey } from '@/shared/hooks/use-escape-key';

interface CategoryFilterDropdownProps {
  categories: CategoryCount[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
}

export function CategoryFileDropdown({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearCategories,
}: CategoryFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false), isOpen);
  useEscapeKey(() => setIsOpen(false), isOpen);

  const label =
    selectedCategories.length === 0
      ? 'All Categories'
      : `${selectedCategories.length} selected`;

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}>
        {label}
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-brown-950/10">
          <button
            type="button"
            onClick={onClearCategories}
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-brown-700 hover:bg-cream-100">
            All Categories
          </button>

          <div className="my-2 h-px bg-brown-950/10" />

          <div className="max-h-72 overflow-auto">
            {categories.map((item) => {
              const checked = selectedCategories.includes(item.category);

              return (
                <label
                  key={item.category}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-bold text-brown-700 hover:bg-cream-100">
                  <span>
                    {item.category} ({item.count})
                  </span>

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleCategory(item.category)}
                    className="h-4 w-4 rounded border-slate-300 accent-brown-950"
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
