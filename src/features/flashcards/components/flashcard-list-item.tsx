import { Button } from '@/shared/components/ui/button';
import { ProgressBar } from '@/shared/components/ui/progress-bar';
import type { Flashcard } from '@/shared/types/flashcard';

interface FlashcardListItemProps {
  flashcard: Flashcard;
  onEdit: (flashcard: Flashcard) => void;
  onDelete: (flashcard: Flashcard) => void;
}

export function FlashcardListItem({
  flashcard,
  onEdit,
  onDelete,
}: FlashcardListItemProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brown-950/10 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-brown-950">
          {flashcard.category}
        </span>

        <span className="text-xs font-bold text-brown-700">
          {flashcard.knownCount === 5
            ? 'Mastered'
            : `${flashcard.knownCount}/5`}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-3 text-base font-bold text-brown-950">
        {flashcard.question}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm font-medium text-brown-700">
        {flashcard.answer}
      </p>

      <ProgressBar
        value={flashcard.knownCount}
        label="Mastery"
        className="mt-5"
      />

      <div className="mt-5 flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onEdit(flashcard)}>
          Edit
        </Button>

        <Button
          variant="ghost"
          className="flex-1 text-pink-700 hover:bg-pink-700/10"
          onClick={() => onDelete(flashcard)}>
          Delete
        </Button>
      </div>
    </article>
  );
}
