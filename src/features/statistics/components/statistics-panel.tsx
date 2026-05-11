import type { Flashcard } from '@/shared/types/flashcard';
import { getFlashcardStatistics } from '../utils/statistics';
import { StatisticsCard } from './statistics-card';

interface StatisticsPanelProps {
  flashcards: Flashcard[];
}

export function StatisticsPanel({ flashcards }: StatisticsPanelProps) {
  const stats = getFlashcardStatistics(flashcards);

  return (
    <section
      aria-labelledby="statistics-heading"
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brown-950/10 sm:p-6">
      <div>
        <p className="text-sm font-bold text-brown-700">Statistics</p>
        <h3
          id="statistics-heading"
          className="mt-1 text-xl font-bold text-brown-950">
          Your learning progress
        </h3>
      </div>

      <div className="mt-5 grid gap-3">
        <StatisticsCard label="Total Cards" value={stats.total} />
        <StatisticsCard label="Mastered" value={stats.mastered} />
        <StatisticsCard label="In Progress" value={stats.inProgress} />
        <StatisticsCard label="Not Started" value={stats.notStarted} />
      </div>
    </section>
  );
}
