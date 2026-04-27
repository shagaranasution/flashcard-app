import type { Flashcard } from '@/shared/types/flashcard';

export function getCurrentCard(
  card: Flashcard[],
  index: number
): Flashcard | null {
  if (card.length === 0) return null;
  return card[index] ?? null;
}
