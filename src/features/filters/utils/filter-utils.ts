import type { Flashcard } from '@/shared/types/flashcard';

export interface CategoryCount {
  category: string;
  count: number;
}

export function getCategoryCounts(flashcards: Flashcard[]): CategoryCount[] {
  const map = new Map<string, number>();

  for (const card of flashcards) {
    map.set(card.category, (map.get(card.category) ?? 0) + 1);
  }

  return [...map].map(([category, count]) => ({
    category,
    count,
  }));
}

export interface FilterOptions {
  selectedCategories: string[];
  hideMastered: boolean;
}

export function filterFlashcards(
  flashcards: Flashcard[],
  options: FilterOptions
): Flashcard[] {
  return flashcards.filter((card) => {
    const matchCategory =
      options.selectedCategories.length === 0 ||
      options.selectedCategories.includes(card.category);

    const matchMastered = !options.hideMastered || card.knownCount < 5;

    return matchCategory && matchMastered;
  });
}

export function shuffleFlashcards(flashcards: Flashcard[]): Flashcard[] {
  const copy = [...flashcards];

  for (let i = copy.length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
