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
            tone="question"
            label="Question"
            text={flashcard.question}
            category={flashcard.category}
            knownCount={flashcard.knownCount}
            helperText="Click card or press Space to reveal answer"
          />

          <CardFace
            tone="answer"
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
  tone: 'question' | 'answer';
  label: string;
  text: string;
  category: string;
  knownCount: number;
  helperText: string;
  className?: string;
}

function CardFace({
  tone,
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
        'flex min-h-104 flex-col overflow-hidden p-6 sm:p-8 lg:min-h-120',
        tone === 'question' ? 'bg-pink-400' : 'bg-blue-400',
        'backface-hidden',
        className,
      ].join(' ')}>
      <div className="flex items-center justify-center">
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-brown-950 ring-1 ring-brown-950/10">
          {category}
        </span>
      </div>

      <div className="mt-10 max-h-72 flex-1 overflow-auto pr-2">
        <p className="text-sm font-bold uppercase tracking-wide text-brown-700">
          {label}
        </p>

        <p className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-brown-950 sm:text-4xl lg:text-5xl">
          {text}
        </p>
      </div>

      <ProgressBar value={knownCount} label="Mastery" className="mt-8" />

      <p className="mt-6 text-sm font-bold text-brown-700">{helperText}</p>
    </div>
  );
}
