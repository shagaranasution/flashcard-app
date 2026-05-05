import { useMemo, useState, type Dispatch } from 'react';
import type { Flashcard } from '@/shared/types/flashcard';
import type { FlashcardAction } from '../utils/flashcard-reducer';
import { FlashcardForm } from './flashcard-form';
import { FlashcardListItem } from './flashcard-list-item';
import { ConfirmDialog } from '@/shared/components/ui/confirm-dialog';
import {
  INITIAL_VISIBLE_CARD_COUNT,
  LOAD_MORE_INCREMENT,
} from '@/shared/lib/constants';
import { Button } from '@/shared/components/ui/button';
import {
  filterFlashcards,
  getCategoryCounts,
  type CategoryCount,
} from '@/features/filters/utils/filter-utils';
import { FilterToolbar } from '@/features/filters/components/filter-toolbar';
import { StatisticsPanel } from '@/features/statistics/components/statistics-panel';

interface AllCardsViewProps {
  flashcards: Flashcard[];
  dispatch: Dispatch<FlashcardAction>;
  onNotify: (message: string) => void;
}

export function AllCardsView({
  flashcards,
  dispatch,
  onNotify,
}: AllCardsViewProps) {
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(
    null
  );
  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(
    INITIAL_VISIBLE_CARD_COUNT
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hideMastered, setHideMastered] = useState<boolean>(false);

  const categories: CategoryCount[] = useMemo(
    () => getCategoryCounts(flashcards),
    [flashcards]
  );

  const filteredFlashcards: Flashcard[] = useMemo(
    () =>
      filterFlashcards(flashcards, {
        selectedCategories,
        hideMastered,
      }),
    [flashcards, selectedCategories, hideMastered]
  );

  const visibleFlashcards = filteredFlashcards.slice(0, visibleCount);
  const hasMoreCards = visibleCount < filteredFlashcards.length;

  const handleToggleCategories = (category: string) => {
    setVisibleCount(INITIAL_VISIBLE_CARD_COUNT);

    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((c) => c !== category);
      }

      return [...current, category];
    });
  };

  const handleClearCategories = () => {
    setVisibleCount(INITIAL_VISIBLE_CARD_COUNT);
    setSelectedCategories([]);
  };

  const handleToggleHideMastered = () => {
    setVisibleCount(INITIAL_VISIBLE_CARD_COUNT);
    setHideMastered((current) => !current);
  };

  const handleConfirmDelete = () => {
    if (!cardToDelete) return;

    dispatch({ type: 'delete', payload: { id: cardToDelete.id } });

    onNotify('Flashcard deleted');

    if (editingFlashcard?.id === cardToDelete.id) {
      setEditingFlashcard(null);
    }

    setCardToDelete(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + LOAD_MORE_INCREMENT);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
      <div className="space-y-6 lg:sticky lg:top-8">
        <FlashcardForm
          editingFlashcard={editingFlashcard}
          onCancelEdit={() => setEditingFlashcard(null)}
          onSubmit={(input) => {
            if (editingFlashcard) {
              dispatch({
                type: 'update',
                payload: { id: editingFlashcard.id, input },
              });

              onNotify('Flashcard updated');
              setEditingFlashcard(null);
              return;
            }

            dispatch({ type: 'create', payload: input });
            onNotify('Flashcard created');
          }}
        />

        <StatisticsPanel flashcards={flashcards} />
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brown-950/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-brown-700">All Cards</p>
              <h2 className="mt-1 text-2xl font-bold text-brown-950">
                Manage your flashcards
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-brown-700">
                Create, edit, delete, filter, and review your saved flashcards.
              </p>
            </div>

            <p className="text-sm font-bold text-brown-700">
              {filteredFlashcards.length} of {flashcards.length} cards
            </p>
          </div>
        </div>

        <FilterToolbar
          categories={categories}
          selectedCategories={selectedCategories}
          hideMastered={hideMastered}
          onToggleCategory={handleToggleCategories}
          onClearCategories={handleClearCategories}
          onToggleHideMastered={handleToggleHideMastered}
        />

        {filteredFlashcards.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-brown-950/10">
            <h3 className="text-xl font-bold text-brown-950">
              No flashcards found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brown-700">
              Try adjusting your filters or create a new flashcard using the
              form above.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleFlashcards.map((card) => (
                <FlashcardListItem
                  key={card.id}
                  flashcard={card}
                  onEdit={setEditingFlashcard}
                  onDelete={setCardToDelete}
                />
              ))}
            </div>

            {hasMoreCards && (
              <div className="flex justify-center">
                <Button variant="secondary" onClick={handleLoadMore}>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
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
