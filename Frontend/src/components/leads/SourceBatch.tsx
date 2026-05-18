import type { LeadSource } from "../../types/lead";

interface SourceBadgeProps {
  source: LeadSource;
}

const SourceBadge = ({
  source,
}: SourceBadgeProps) => {
  return (
    <span className="px-3 py-1 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
      {source}
    </span>
  );
};

export default SourceBadge;