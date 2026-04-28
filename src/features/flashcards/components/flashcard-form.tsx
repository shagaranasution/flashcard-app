import type { FlashcardInput } from '@/shared/types/flashcard';
import { useForm } from 'react-hook-form';
import {
  flashcardSchema,
  type FlashcardFormValues,
} from '../utils/flashcard-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/shared/components/ui/textarea';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

interface FlashcardFormProps {
  onSubmit: (input: FlashcardInput) => void;
}

export function FlashcardForm({ onSubmit }: FlashcardFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: '',
      answer: '',
      category: '',
    },
  });

  const handleValidSubmit = (values: FlashcardFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <p className="text-sm font-semibold text-slate-500">Create Card</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">
          Add a new flashcard
        </h2>
      </div>

      <div className="mt-6 grid gap-4">
        <Textarea
          label="Question"
          placeholder="Example: What does HTML stand for?"
          error={errors.question?.message}
          {...register('question')}
        />

        <Textarea
          label="Answer"
          placeholder="Example: HyperText Markup Language"
          error={errors.answer?.message}
          {...register('answer')}
        />

        <Input
          label="Category"
          placeholder="Example: Web Development"
          error={errors.category?.message}
          {...register('category')}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          Add Flashcard
        </Button>
      </div>
    </form>
  );
}
