import { getCategoryCounts } from './features/filters/utils/filter-utils';
import { useFlashcards } from './features/flashcards/hooks/use-flashcards';
import { getFlashcardStatistics } from './features/statistics/utils/statistics';

export default function App() {
  const { flashcards } = useFlashcards();

  const stats = getFlashcardStatistics(flashcards);
  const categories = getCategoryCounts(flashcards);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Flashcard App</h1>

        <pre>{JSON.stringify(stats, null, 2)}</pre>

        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </div>
    </main>
  );
}
