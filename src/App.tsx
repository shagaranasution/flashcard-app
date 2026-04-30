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
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Flashcard App
          </h1>

          <Tabs
            items={viewTabs}
            value={viewMode}
            onChange={(value) => setViewMode(value)}
          />
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
