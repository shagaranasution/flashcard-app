import { seedFlashcards } from '@/data/seed-flashcards';
import { FLASHCARDS_STORAGE_KEY } from '@/shared/lib/constants';
import { readFromStorage, writeToStorage } from '@/shared/lib/storage';
import type { Flashcard } from '@/shared/types/flashcard';
import { useEffect, useReducer } from 'react';
import { flashcardReducer } from '../utils/flashcard-reducer';

function getInitialFlashcards(): Flashcard[] {
  return readFromStorage<Flashcard[]>(FLASHCARDS_STORAGE_KEY, seedFlashcards);
}

export function useFlashcards() {
  const [flashcards, dispatch] = useReducer(
    flashcardReducer,
    undefined,
    getInitialFlashcards
  );

  useEffect(() => {
    writeToStorage(FLASHCARDS_STORAGE_KEY, flashcards);
  }, [flashcards]);

  return {
    flashcards,
    dispatch,
  };
}
