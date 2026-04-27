export type FlashcardId = string;

export interface Flashcard {
  id: FlashcardId;
  question: string;
  answer: string;
  category: string;
  knownCount: number;
}

export interface FlashcardInput {
  question: string;
  answer: string;
  category: string;
}

export type MasteryStatus = 'not-started' | 'in-progress' | 'mastered';
