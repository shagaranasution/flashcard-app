import type { CategoryCount } from '../utils/filter-utils';

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

        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={hideMastered}
            onChange={onToggleHideMastered}
            className="h-4 w-4 rounded border-slate-300"
          />
          Hide mastered cards
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onClearCategories}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
            selectedCategories.length === 0
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}>
          All Categories
        </button>

        {categories.map((item) => {
          const isSelected = selectedCategories.includes(item.category);

          return (
            <button
              key={item.category}
              type="button"
              onClick={() => onToggleCategory(item.category)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                isSelected
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
              {item.category} ({item.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
