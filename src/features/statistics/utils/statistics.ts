import type { Flashcard, MasteryStatus } from '@/shared/types/flashcard';

export function getMasteryStatus(knownCount: number): MasteryStatus {
  if (knownCount === 0) return 'not-started';
  if (knownCount === 5) return 'mastered';
  return 'in-progress';
}

export interface FlashcardStatistics {
  total: number;
  notStarted: number;
  inProgress: number;
  mastered: number;
}

export function getFlashcardStatistics(
  flashcards: Flashcard[]
): FlashcardStatistics {
  let notStarted = 0;
  let inProgress = 0;
  let mastered = 0;

  for (const card of flashcards) {
    const status = getMasteryStatus(card.knownCount);

    if (status === 'in-progress') inProgress++;
    else if (status === 'not-started') notStarted++;
    else mastered++;
  }

  return {
    total: flashcards.length,
    notStarted,
    inProgress,
    mastered,
  };
}
