import type { Flashcard, FlashcardInput } from '@/shared/types/flashcard';
import { useForm } from 'react-hook-form';
import {
  flashcardSchema,
  type FlashcardFormValues,
} from '../utils/flashcard-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/shared/components/ui/textarea';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useEffect } from 'react';

interface FlashcardFormProps {
  editingFlashcard?: Flashcard | null;
  onSubmit: (input: FlashcardInput) => void;
  onCancelEdit?: () => void;
}

export function FlashcardForm({
  editingFlashcard = null,
  onSubmit,
  onCancelEdit,
}: FlashcardFormProps) {
  const isEditing = Boolean(editingFlashcard);

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

  useEffect(() => {
    if (!editingFlashcard) {
      reset({
        question: '',
        answer: '',
        category: '',
      });

      return;
    }

    reset({
      question: editingFlashcard.question,
      answer: editingFlashcard.answer,
      category: editingFlashcard.category,
    });
  }, [editingFlashcard, reset]);

  const handleValidSubmit = (values: FlashcardFormValues) => {
    onSubmit(values);

    if (!isEditing) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brown-950/10 sm:p-6">
      <div>
        <h2 className="mt-1 text-2xl font-bold text-brown-950">
          {isEditing ? 'Edit flashcard details' : 'Create a flashcard'}
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:mt-6">
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

      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <Button variant="secondary" onClick={onCancelEdit}>
            Cancel
          </Button>
        ) : null}

        <Button type="submit" disabled={isSubmitting}>
          {isEditing ? 'Save Changes' : 'Add Flashcard'}
        </Button>
      </div>
    </form>
  );
}
