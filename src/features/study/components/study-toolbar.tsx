import { CategoryFileDropdown } from '@/features/filters/components/category-filter-dropdown';
import type { CategoryCount } from '@/features/filters/utils/filter-utils';
import { Button } from '@/shared/components/ui/button';

interface StudyToolbarProps {
  categories: CategoryCount[];
  selectedCategories: string[];
  hideMastered: boolean;
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
  onToggleHideMastered: () => void;
  onShuffle: () => void;
}

export function StudyToolbar({
  categories,
  selectedCategories,
  hideMastered,
  onToggleCategory,
  onClearCategories,
  onToggleHideMastered,
  onShuffle,
}: StudyToolbarProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <CategoryFileDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          onClearCategories={onClearCategories}
          align="left"
        />

        <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-brown-700">
          <input
            type="checkbox"
            checked={hideMastered}
            onChange={onToggleHideMastered}
            className="h-4 w-4 rounded border-slate-300 accent-brown-950"
          />
          Hide mastered cards
        </label>
      </div>

      <Button variant="secondary" onClick={onShuffle}>
        Shuffle Cards
      </Button>
    </div>
  );
}
