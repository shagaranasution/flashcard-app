import { Button } from '@/shared/components/ui/button';

interface StudyToolbarProps {
  hideMastered: boolean;
  onToggleHideMastered: () => void;
  onShuffle: () => void;
}

export function StudyToolbar({
  hideMastered,
  onToggleHideMastered,
  onShuffle,
}: StudyToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={hideMastered}
          onChange={onToggleHideMastered}
          className="h-4 w-4 rounded border-slate-300"
        />
        Hide mastered cards
      </label>

      <Button variant="secondary" onClick={onShuffle}>
        Shuffle Cards
      </Button>
    </div>
  );
}
