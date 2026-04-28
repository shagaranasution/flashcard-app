import { Button } from '@/shared/components/ui/button';
import type { Flashcard } from '@/shared/types/flashcard';
import type { Dispatch } from 'react';
import type { FlashcardAction } from '../utils/flashcard-reducer';
import { FlashcardForm } from './flashcard-form';

interface AllCardsViewProps {
  flashcards: Flashcard[];
  dispatch: Dispatch<FlashcardAction>;
}

export function AllCardsView({ flashcards, dispatch }: AllCardsViewProps) {
  return (
    <section className="space-y-6">
      <FlashcardForm
        onSubmit={(input) => {
          dispatch({ type: 'create', payload: input });
        }}
      />

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">All Cards</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              Manage your flashcards
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Create, edit, delete, filter, and review your saved flashcards.
            </p>
          </div>

          <p className="text-sm font-semibold text-slate-500">
            {flashcards.length} cards
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flashcards.slice(0, 12).map((card) => (
          <article
            key={card.id}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {card.category}
              </span>

              <span className="text-xs font-semibold text-slate-500">
                {card.knownCount}/5
              </span>
            </div>

            <h3 className="mt-4 line-clamp-3 text-base font-bold text-slate-950">
              {card.question}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm text-slate-600">
              {card.answer}
            </p>

            <div className="mt-5 flex gap-2">
              <Button variant="secondary" className="flex-1">
                Edit
              </Button>
              <Button variant="ghost" className="flex-1">
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
