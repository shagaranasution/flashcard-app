import { useState, type Dispatch } from 'react';
import type { Flashcard } from '@/shared/types/flashcard';
import type { FlashcardAction } from '../utils/flashcard-reducer';
import { FlashcardForm } from './flashcard-form';
import { FlashcardListItem } from './flashcard-list-item';
import { ConfirmDialog } from '@/shared/components/ui/confirm-dialog';

interface AllCardsViewProps {
  flashcards: Flashcard[];
  dispatch: Dispatch<FlashcardAction>;
}

export function AllCardsView({ flashcards, dispatch }: AllCardsViewProps) {
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(
    null
  );
  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);

  const handleConfirmDelete = () => {
    if (!cardToDelete) return;

    dispatch({ type: 'delete', payload: { id: cardToDelete.id } });

    if (editingFlashcard?.id === cardToDelete.id) {
      setEditingFlashcard(null);
    }

    setCardToDelete(null);
  };

  return (
    <section className="space-y-6">
      <FlashcardForm
        editingFlashcard={editingFlashcard}
        onCancelEdit={() => setEditingFlashcard(null)}
        onSubmit={(input) => {
          if (editingFlashcard) {
            dispatch({
              type: 'update',
              payload: { id: editingFlashcard.id, input },
            });

            setEditingFlashcard(null);
            return;
          }

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
          <FlashcardListItem
            key={card.id}
            flashcard={card}
            onEdit={setEditingFlashcard}
            onDelete={setCardToDelete}
          />
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(cardToDelete)}
        title="Delete flashcard?"
        description={
          cardToDelete
            ? `This will permanently delete: "${cardToDelete.question}"`
            : ''
        }
        confirmLabel="Delete"
        onClose={() => setCardToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
