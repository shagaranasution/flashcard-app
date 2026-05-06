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
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center px-6">
      <Button onClick={onKnowThis} disabled={isMastered}>
        {isMastered ? 'Mastered' : 'I know this'}
      </Button>

      <Button
        variant="ghost"
        onClick={onResetProgress}
        disabled={knownCount === 0}>
        Reset Progress
      </Button>
    </div>
  );
}
