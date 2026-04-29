import type { Flashcard } from '@/shared/types/flashcard';

export function getCurrentCard(
  card: Flashcard[],
  index: number
): Flashcard | null {
  if (card.length === 0) return null;
  return card[index] ?? null;
}

export function getSafeStudyIndex(cards: Flashcard[], index: number): number {
  if (cards.length === 0) return 0;
  return Math.min(Math.max(index, 0), cards.length - 1);
}
