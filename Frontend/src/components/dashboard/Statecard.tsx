interface StatCardProps {
  label: string;

  value: number;

  note?: string;
}

const StatCard = ({
  label,
  value,
  note,
}: StatCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

      <p className="text-zinc-400 text-sm">
        {label}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

      {note && (
        <p className="text-xs text-zinc-500 mt-1">
          {note}
        </p>
      )}

    </div>
  );
};

export default StatCard;