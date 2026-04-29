interface StatisticsCardProps {
  label: string;
  value: number;
}

export function StatisticsCard({ label, value }: StatisticsCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
