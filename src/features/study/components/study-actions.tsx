import { Button } from '@/shared/components/ui/button';
import { ProgressBar } from '@/shared/components/ui/progress-bar';

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
    <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brown-950/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-xs">
        <ProgressBar
          value={knownCount}
          label={knownCount >= 5 ? 'Mastered' : 'Mastery Progress'}
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={onKnowThis} disabled={isMastered}>
          {isMastered ? 'Mastered' : 'I know this'}
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
