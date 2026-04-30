import type { CategoryCount } from '../utils/filter-utils';
import { CategoryFileDropdown } from './category-filter-dropdown';

interface FilterToolbarProps {
  categories: CategoryCount[];
  selectedCategories: string[];
  hideMastered: boolean;
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
  onToggleHideMastered: () => void;
}

export function FilterToolbar({
  categories,
  selectedCategories,
  hideMastered,
  onToggleCategory,
  onClearCategories,
  onToggleHideMastered,
}: FilterToolbarProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Filters</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">
            Focus your practice
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={hideMastered}
              onChange={onToggleHideMastered}
              className="h-4 w-4 rounded border-slate-300"
            />
            Hide mastered cards
          </label>

          <CategoryFileDropdown
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={onToggleCategory}
            onClearCategories={onClearCategories}
          />
        </div>
      </div>
    </div>
  );
}
