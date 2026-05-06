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
    <div className="flex flex-row w-full justify-between items-center gap-3">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex-1">
        Previous
      </Button>

      <p className="flex-3 min-w-24 text-center text-sm font-bold text-brown-700">
        Card {currentIndex + 1} of {totalCards}
      </p>

      <Button
        variant="secondary"
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
        className="flex-1">
        Next
      </Button>
    </div>
  );
}
