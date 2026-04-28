import z from 'zod';

export const flashcardSchema = z.object({
  question: z.string().trim().min(1, 'Question is required'),
  answer: z.string().trim().min(1, 'Answer is required'),
  category: z.string().trim().min(1, 'Category is required'),
});

export type FlashcardFormValues = z.infer<typeof flashcardSchema>;
