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
      className="group min-h-112 w-full rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-950"
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
        'flex min-h-112 flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brown-950/10',
        'transition group-hover:-translate-y-0.5 group-hover:shadow-md',
        'backface-hidden',
        className,
      ].join(' ')}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-brown-950">
          {category}
        </span>

        <span className="text-xs font-bold text-brown-700">
          {knownCount === 5 ? 'Mastered' : `${knownCount}/5`}
        </span>
      </div>

      <div className="mt-10 max-h-72 flex-1 overflow-auto pr-2">
        <p className="text-sm font-bold uppercase tracking-wide text-brown-700">
          {label}
        </p>

        <p className="mt-4 text-2xl font-bold leading-relaxed text-brown-950">
          {text}
        </p>
      </div>

      <ProgressBar value={knownCount} label="Mastery" className="mt-8" />

      <p className="mt-6 text-sm font-bold text-brown-700">{helperText}</p>
    </div>
  );
}
