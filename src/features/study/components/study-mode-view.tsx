import type { Flashcard } from '@/shared/types/flashcard';

interface StudyModeViewProps {
  flashcards: Flashcard[];
}

export function StudyModeView({ flashcards }: StudyModeViewProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-slate-500">Study Mode</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">
          Practice one card at a time
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Review flashcards, reveal answers, and track your mastery progress.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-slate-500">
          {flashcards.length} cards available
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-950">
          Study mode setup is ready
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          Next: add the current study card, flip behavior, previous and next
          controls, and mastery actions.
        </p>
      </div>
    </section>
  );
}
