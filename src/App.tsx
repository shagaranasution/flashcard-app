import { AllCardsView } from './features/flashcards/components/all-cards-view';
import { useFlashcards } from './features/flashcards/hooks/use-flashcards';

export default function App() {
  const { flashcards, dispatch } = useFlashcards();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Flashcard App
          </h1>
        </header>

        <AllCardsView flashcards={flashcards} dispatch={dispatch} />
      </div>
    </main>
  );
}
