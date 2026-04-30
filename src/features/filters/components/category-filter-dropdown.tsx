import { useState } from 'react';
import type { CategoryCount } from '../utils/filter-utils';
import { Button } from '@/shared/components/ui/button';

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

  const label =
    selectedCategories.length === 0
      ? 'All Categories'
      : `${selectedCategories.length} selected`;

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}>
        {label}
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-200">
          <button
            type="button"
            onClick={onClearCategories}
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">
            All Categories
          </button>

          <div className="my-2 h-px bg-slate-200" />

          <div className="max-h-72 overflow-auto">
            {categories.map((item) => {
              const checked = selectedCategories.includes(item.category);

              return (
                <label
                  key={item.category}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <span>
                    {item.category} ({item.count})
                  </span>

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleCategory(item.category)}
                    className="h-4 w-4 rounded border-slate-300"
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
