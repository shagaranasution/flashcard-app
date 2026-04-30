import { Button } from '@/shared/components/ui/button';

interface StudyActionsProps {
  knownCount: number;
  onKnowThis: () => void;
  onResetProgress: () => void;
}

export function StudyActions({
  knownCount,
  onKnowThis,
  onResetProgress,
}: StudyActionsProps) {
  const isMastered = knownCount >= 5;

  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-500">Mastery Progress</p>
        <p className="mt-1 text-xl font-bold text-slate-950">{knownCount}/5</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onKnowThis} disabled={isMastered}>
          {isMastered ? 'Mastered' : 'I Know This'}
        </Button>

        <Button
          variant="secondary"
          onClick={onResetProgress}
          disabled={knownCount === 0}>
          Reset Progress
        </Button>
      </div>
    </div>
  );
}
