import type { Flashcard } from '@/shared/types/flashcard';

interface StudyCardProps {
  flashcard: Flashcard;
  isAnswerVisible: boolean;
  onToggleAnswer: () => void;
}

export function StudyCard({
  flashcard,
  isAnswerVisible,
  onToggleAnswer,
}: StudyCardProps) {
  return (
    <button
      type="button"
      onClick={onToggleAnswer}
      className="min-h-80 w-full rounded-3xl bg-white p-8 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      aria-label={isAnswerVisible ? 'Hide answer' : 'Reveal answer'}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {flashcard.category}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          Mastery {flashcard.knownCount}/5
        </span>
      </div>

      <div className="mt-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {isAnswerVisible ? 'Answer' : 'Question'}
        </p>

        <p className="mt-4 text-2xl font-bold leading-relaxed text-slate-950">
          {isAnswerVisible ? flashcard.answer : flashcard.question}
        </p>
      </div>

      <p className="mt-10 text-sm font-semibold text-slate-500">
        Click card or press Space to{' '}
        {isAnswerVisible ? 'show question' : 'reveal answer'}
      </p>
    </button>
  );
}
