import { Button } from '@/shared/components/ui/button';

interface StudyNavigationProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function StudyNavigation({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
}: StudyNavigationProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brown-950/10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-bold text-brown-700">
        Card {currentIndex + 1} of {totalCards}
      </p>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={currentIndex === 0}>
          Previous
        </Button>

        <Button
          variant="secondary"
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}
