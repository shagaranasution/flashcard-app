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
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brown-950/10 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-brown-700">
        <input
          type="checkbox"
          checked={hideMastered}
          onChange={onToggleHideMastered}
          className="h-4 w-4 rounded border-slate-300 accent-brown-950"
        />
        Hide mastered cards
      </label>

      <Button variant="secondary" onClick={onShuffle}>
        Shuffle Cards
      </Button>
    </div>
  );
}
