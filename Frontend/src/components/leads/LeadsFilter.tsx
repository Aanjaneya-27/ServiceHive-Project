import {
  type LeadSource,
  type LeadStatus,
} from "../../types/lead";

interface LeadFiltersProps {
  search: string;

  status: string;

  source: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onSourceChange: (
    value: string
  ) => void;

  onClear: () => void;
}

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Lost",
];

const sources: LeadSource[] = [
  "Website",
  "Instagram",
  "Referral",
];

const LeadFilters = ({
  search,
  status,
  source,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onClear,
}: LeadFiltersProps) => {

  const hasFilters =
    search || status || source;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 outline-none focus:border-violet-500"
        />

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2"
        >

          <option value="">
            All Status
          </option>

          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

        <select
          value={source}
          onChange={(e) =>
            onSourceChange(
              e.target.value
            )
          }
          className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2"
        >

          <option value="">
            All Source
          </option>

          {sources.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}

        </select>

        <button
          onClick={onClear}
          disabled={!hasFilters}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm disabled:opacity-50"
        >
          Clear Filters
        </button>

      </div>

    </div>
  );
};

export default LeadFilters;