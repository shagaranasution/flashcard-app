import type { Flashcard } from '@/shared/types/flashcard';
import { useMemo, useState, type Dispatch } from 'react';
import { getCurrentCard } from '../utils/study-selectors';
import { StudyCard } from './study-card';
import { StudyNavigation } from './study-navigation';
import type { FlashcardAction } from '@/features/flashcards/utils/flashcard-reducer';
import { StudyActions } from './study-actions';
import {
  filterFlashcards,
  shuffleFlashcards,
} from '@/features/filters/utils/filter-utils';
import { StudyToolbar } from './study-toolbar';
import { useKeyboardShortcuts } from '@/shared/hooks/use-keyboard-shortcuts';

interface StudyModeViewProps {
  flashcards: Flashcard[];
  dispatch: Dispatch<FlashcardAction>;
}

export function StudyModeView({ flashcards, dispatch }: StudyModeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [hideMastered, setHideMastered] = useState(false);
  const [shuffledIds, setShuffledIds] = useState<string[]>([]);

  const studyCards = useMemo(() => {
    const filtered: Flashcard[] = filterFlashcards(flashcards, {
      selectedCategories: [],
      hideMastered,
    });

    if (shuffledIds.length === 0) {
      return filtered;
    }

    const orderMap = new Map<string, number>(
      shuffledIds.map((id, index) => [id, index])
    );

    return filtered.toSorted((a, b) => {
      const orderA = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const orderB = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;

      return orderA - orderB;
    });
  }, [flashcards, hideMastered, shuffledIds]);

  const currentCard = getCurrentCard(studyCards, currentIndex);

  const handlePrevious = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setIsAnswerVisible(false);
  };

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, studyCards.length - 1));
    setIsAnswerVisible(false);
  };

  const handleKnowThis = () => {
    if (!currentCard) return;

    dispatch({
      type: 'incrementKnown',
      payload: {
        id: currentCard.id,
      },
    });
  };

  const handleResetProgress = () => {
    if (!currentCard) return;

    dispatch({
      type: 'resetKnown',
      payload: {
        id: currentCard.id,
      },
    });
  };

  const handleToggleHideMastered = () => {
    setHideMastered((current) => !current);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  };

  const handleShuffle = () => {
    const shuffledCards = shuffleFlashcards(studyCards);

    setShuffledIds(shuffledCards.map((card) => card.id));
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  };

  useKeyboardShortcuts(
    {
      onNext: handleNext,
      onPrevious: handlePrevious,
      onToggleAnswer: () => setIsAnswerVisible((value) => !value),
    },
    Boolean(currentCard)
  );

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="space-y-6">
        {/* Header Card Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brown-950/10">
          <p className="text-sm font-bold text-brown-700">Study Mode</p>
          <h2 className="mt-1 text-2xl font-bold text-brown-950">
            Practice one card at a time
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-brown-700">
            Review flashcards, reveal answers, and track your mastery progress.
          </p>
        </div>

        {/* Study Card Section */}
        {!currentCard ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-brown-950/10">
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-brown-950/10">
              <h3 className="text-xl font-bold text-brown-950">
                No cards available
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brown-700">
                {hideMastered
                  ? 'All available cards are mastered. Turn off “Hide mastered cards” to review them again.'
                  : 'Add flashcards from the All Cards view before starting a study session.'}
              </p>
            </div>
          </div>
        ) : (
          <StudyCard
            flashcard={currentCard}
            isAnswerVisible={isAnswerVisible}
            onToggleAnswer={() => setIsAnswerVisible((value) => !value)}
          />
        )}
      </div>

      <div className="space-y-6 lg:sticky lg:top-8">
        <StudyToolbar
          hideMastered={hideMastered}
          onToggleHideMastered={handleToggleHideMastered}
          onShuffle={handleShuffle}
        />

        {currentCard && (
          <>
            <StudyNavigation
              currentIndex={currentIndex}
              totalCards={studyCards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />

            <StudyActions
              knownCount={currentCard.knownCount}
              onKnowThis={handleKnowThis}
              onResetProgress={handleResetProgress}
            />
          </>
        )}
      </div>
    </section>
  );
}
