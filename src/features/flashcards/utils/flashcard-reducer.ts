import { MAX_KNOWN_COUNT } from '@/shared/lib/constants';
import type { Flashcard, FlashcardInput } from '@/shared/types/flashcard';

export type FlashcardAction =
  | { type: 'create'; payload: FlashcardInput }
  | { type: 'update'; payload: { id: string; input: FlashcardInput } }
  | { type: 'delete'; payload: { id: string } }
  | { type: 'incrementKnown'; payload: { id: string } }
  | { type: 'resetKnown'; payload: { id: string } };

export function flashcardReducer(
  flashcards: Flashcard[],
  action: FlashcardAction
): Flashcard[] {
  switch (action.type) {
    case 'create': {
      const newFlashcard: Flashcard = {
        id: crypto.randomUUID(),
        question: action.payload.question.trim(),
        answer: action.payload.answer.trim(),
        category: action.payload.category.trim(),
        knownCount: 0,
      };

      return [newFlashcard, ...flashcards];
    }

    case 'update': {
      return flashcards.map((flashcard) => {
        if (flashcard.id !== action.payload.id) {
          return flashcard;
        }

        return {
          ...flashcard,
          question: action.payload.input.question.trim(),
          answer: action.payload.input.answer.trim(),
          category: action.payload.input.category.trim(),
        };
      });
    }

    case 'delete': {
      return flashcards.filter(
        (flashcard) => flashcard.id !== action.payload.id
      );
    }

    case 'incrementKnown': {
      return flashcards.map((flashcard) => {
        if (flashcard.id !== action.payload.id) {
          return flashcard;
        }

        return {
          ...flashcard,
          knownCount: Math.min(flashcard.knownCount + 1, MAX_KNOWN_COUNT),
        };
      });
    }

    case 'resetKnown': {
      return flashcards.map((flashcard) => {
        if (flashcard.id !== action.payload.id) {
          return flashcard;
        }

        return {
          ...flashcard,
          knownCount: 0,
        };
      });
    }

    default:
      return flashcards;
  }
}
