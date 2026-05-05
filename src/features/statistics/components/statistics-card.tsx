interface StatisticsCardProps {
  label: string;
  value: number;
}

export function StatisticsCard({ label, value }: StatisticsCardProps) {
  return (
    <div className="rounded-2xl bg-cream-100 p-4 ring-1 ring-brown-950/10">
      <p className="text-sm font-bold text-brown-700">{label}</p>
      <p className="mt-2 text-3xl font-bold text-brown-950">{value}</p>
    </div>
  );
}
