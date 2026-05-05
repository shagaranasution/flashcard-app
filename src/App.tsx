import { useState } from 'react';
import { AllCardsView } from './features/flashcards/components/all-cards-view';
import { useFlashcards } from './features/flashcards/hooks/use-flashcards';
import type { ViewMode } from './shared/types/flashcard';
import { Tabs } from './shared/components/ui/tabs';
import { StudyModeView } from './features/study/components/study-mode-view';
import { useToast } from './shared/hooks/use-toast';
import { ToastViewport } from './shared/components/ui/toast';

const viewTabs: Array<{ label: string; value: ViewMode }> = [
  { label: 'Study', value: 'study' },
  { label: 'All Cards', value: 'all-cards' },
];

export default function App() {
  const { flashcards, dispatch } = useFlashcards();
  const [viewMode, setViewMode] = useState<ViewMode>('study');
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <main className="min-h-screen bg-cream-100 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-5 rounded-3xl py-5 text-brown-950 sm:mb-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Flashcard
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-brown-700">
              Reveal answers, mark what you know, and focus on cards that still
              need practice.
            </p>
          </div>

          <Tabs items={viewTabs} value={viewMode} onChange={setViewMode} />
        </header>

        {viewMode === 'study' ? (
          <StudyModeView flashcards={flashcards} dispatch={dispatch} />
        ) : (
          <AllCardsView
            flashcards={flashcards}
            dispatch={dispatch}
            onNotify={showToast}
          />
        )}
      </div>

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
