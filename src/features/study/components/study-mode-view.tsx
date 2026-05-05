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
import { StatisticsPanel } from '@/features/statistics/components/statistics-panel';

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
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brown-950/10">
        <StudyToolbar
          hideMastered={hideMastered}
          onToggleHideMastered={handleToggleHideMastered}
          onShuffle={handleShuffle}
        />

        <div className="border-t border-brown-950/10" />

        {!currentCard ? (
          <div className="px-6 py-16 text-center sm:px-10">
            <h3 className="text-xl font-bold text-brown-950">
              {flashcards.length === 0
                ? 'No flashcards yet'
                : 'No cards to study'}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brown-700">
              {flashcards.length === 0
                ? 'Go to All Cards and create your first flashcard before starting a study session.'
                : 'All available cards are currently hidden because they are mastered. Turn off “Hide mastered cards” to review them again.'}
            </p>
          </div>
        ) : (
          <>
            <StudyCard
              flashcard={currentCard}
              isAnswerVisible={isAnswerVisible}
              onToggleAnswer={() => setIsAnswerVisible((value) => !value)}
            />

            <div className="border-t border-brown-950/10" />

            <div className="grid gap-4 p-4 sm:p-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <StudyActions
                knownCount={currentCard.knownCount}
                onKnowThis={handleKnowThis}
                onResetProgress={handleResetProgress}
              />

              <StudyNavigation
                currentIndex={currentIndex}
                totalCards={studyCards.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </>
        )}
      </div>

      <div className="lg:sticky lg:top-8">
        <StatisticsPanel flashcards={flashcards} />
      </div>
    </section>
  );
}
