import type { Flashcard } from '@/shared/types/flashcard';
import { getFlashcardStatistics } from '../utils/statistics';
import { StatisticsCard } from './statistics-card';

interface StatisticsPanelProps {
  flashcards: Flashcard[];
}

export function StatisticsPanel({ flashcards }: StatisticsPanelProps) {
  const stats = getFlashcardStatistics(flashcards);

  return (
    <section className="rounded-3xl bg-white p-card shadow-sm ring-1 ring-slate-200">
      <div>
        <p className="text-sm font-semibold text-slate-500">Statistics</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Your learning progress
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticsCard label="Total Cards" value={stats.total} />
        <StatisticsCard label="Not Started" value={stats.notStarted} />
        <StatisticsCard label="In Progress" value={stats.inProgress} />
        <StatisticsCard label="Mastered" value={stats.mastered} />
      </div>
    </section>
  );
}
