import { ProgressBar } from '@/shared/components/ui/progress-bar';
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
      className="group min-h-112 w-full rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      aria-label={isAnswerVisible ? 'Show question' : 'Reveal answer'}
      aria-pressed={isAnswerVisible}>
      <div className="relative perspective-distant">
        <div
          className={[
            'relative rounded-3xl transition-transform duration-500 transform-3d',
            isAnswerVisible ? 'transform-[rotateY(180deg)]' : '',
          ].join(' ')}>
          <CardFace
            label="Question"
            text={flashcard.question}
            category={flashcard.category}
            knownCount={flashcard.knownCount}
            helperText="Click card or press Space to reveal answer"
          />

          <CardFace
            label="Answer"
            text={flashcard.answer}
            category={flashcard.category}
            knownCount={flashcard.knownCount}
            helperText="Click card or press Space to show question"
            className="absolute inset-0 transform-[rotateY(180deg)]"
          />
        </div>
      </div>
    </button>
  );
}

interface CardFaceProps {
  label: string;
  text: string;
  category: string;
  knownCount: number;
  helperText: string;
  className?: string;
}

function CardFace({
  label,
  text,
  category,
  knownCount,
  helperText,
  className = '',
}: CardFaceProps) {
  return (
    <div
      className={[
        'flex min-h-112 flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 overflow-hidden',
        'transition group-hover:-translate-y-0.5 group-hover:shadow-md',
        'backface-hidden',
        className,
      ].join(' ')}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {category}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {knownCount === 5 ? 'Mastered' : `${knownCount}/5`}
        </span>
      </div>

      <div className="mt-10 max-h-72 flex-1 overflow-auto pr-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-4 text-2xl font-bold leading-relaxed text-slate-950">
          {text}
        </p>
      </div>

      <ProgressBar value={knownCount} label="Mastery" className="mt-8" />

      <p className="mt-6 text-sm font-semibold text-slate-500">{helperText}</p>
    </div>
  );
}
