import type { Flashcard } from '@/shared/types/flashcard';

export const seedFlashcards: Flashcard[] = [
  {
    id: 'starter-001',
    question: 'What is a flashcard useful for?',
    answer:
      'A flashcard helps you actively recall information by testing yourself with a question and checking the answer.',
    category: 'Getting Started',
    knownCount: 0,
  },
  {
    id: 'starter-002',
    question: 'How do I mark a card as learned?',
    answer:
      'Click “I know this” during Study Mode. Each click increases the mastery progress until the card is mastered.',
    category: 'App Tips',
    knownCount: 1,
  },
  {
    id: 'starter-003',
    question: 'What does “Hide mastered cards” do?',
    answer:
      'It hides cards with full mastery progress so you can focus on the cards that still need practice.',
    category: 'App Tips',
    knownCount: 5,
  },
  {
    id: 'starter-004',
    question: 'What should I write on the question side?',
    answer:
      'Write a clear prompt that makes you recall one specific idea, definition, fact, or concept.',
    category: 'Study Tips',
    knownCount: 0,
  },
  {
    id: 'starter-005',
    question: 'What makes a good flashcard answer?',
    answer:
      'A good answer is short, accurate, and focused on the key idea you want to remember.',
    category: 'Study Tips',
    knownCount: 2,
  },
];
