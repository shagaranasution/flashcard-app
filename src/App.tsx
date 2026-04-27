import { useFlashcards } from './features/flashcards/hooks/use-flashcards';

export default function App() {
  const { flashcards, dispatch } = useFlashcards();

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Flashcard App</h1>

        <p className="mt-2 text-slate-600">Total cards: {flashcards.length}</p>

        <button
          type="button"
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
          onClick={() => {
            dispatch({
              type: 'incrementKnown',
              payload: { id: flashcards[0].id },
            });
          }}>
          Increase first card progress
        </button>

        <pre className="mt-6 overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-white">
          {JSON.stringify(flashcards[0], null, 2)}
        </pre>
      </div>
    </main>
  );
}
