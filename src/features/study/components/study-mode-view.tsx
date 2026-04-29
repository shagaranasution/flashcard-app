import type { Flashcard } from '@/shared/types/flashcard';
import { useState } from 'react';
import { getCurrentCard } from '../utils/study-selectors';
import { StudyCard } from './study-card';
import { StudyNavigation } from './study-navigation';

interface StudyModeViewProps {
  flashcards: Flashcard[];
}

export function StudyModeView({ flashcards }: StudyModeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const currentCard = getCurrentCard(flashcards, currentIndex);

  const handlePrevious = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setIsAnswerVisible(false);
  };

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, flashcards.length - 1));
    setIsAnswerVisible(false);
  };

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

      {!currentCard ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-950">
            No cards available
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Add flashcards from the All Cards view before starting a study
            session.
          </p>
        </div>
      ) : (
        <>
          <StudyNavigation
            currentIndex={currentIndex}
            totalCards={flashcards.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          <StudyCard
            flashcard={currentCard}
            isAnswerVisible={isAnswerVisible}
            onToggleAnswer={() => setIsAnswerVisible((value) => !value)}
          />
        </>
      )}
    </section>
  );
}
