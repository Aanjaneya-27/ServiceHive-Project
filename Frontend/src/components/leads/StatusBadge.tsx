import type { LeadStatus } from "../../types/lead";

interface StatusBadgeProps {
  status: LeadStatus;
}

const StatusBadge = ({
  status,
}: StatusBadgeProps) => {

  const styles: Record<
    LeadStatus,
    string
  > = {

    New:
      "bg-blue-500/10 text-blue-400 border-blue-500/30",

    Contacted:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",

    Qualified:
      "bg-green-500/10 text-green-400 border-green-500/30",

    Lost:
      "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;