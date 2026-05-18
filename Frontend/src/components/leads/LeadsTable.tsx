import { type Lead } from "../../types/lead";

import SourceBadge from "./SourceBatch";
import StatusBadge from "./StatusBadge";

interface LeadTableProps {
  leads: Lead[];

  onEdit: (lead: Lead) => void;

  onDelete: (lead: Lead) => void;
}

const LeadTable = ({
  leads,
  onEdit,
  onDelete,
}: LeadTableProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-zinc-950 text-zinc-400">

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Source
              </th>

              <th className="text-left p-4">
                Assigned
              </th>

              <th className="text-left p-4">
                Created
              </th>

              <th className="text-right p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-8 text-zinc-400"
                >
                  No leads found
                </td>

              </tr>

            ) : (

              leads.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >

                  <td className="p-4 font-medium">
                    {lead.name}
                  </td>

                  <td className="p-4 text-zinc-400">
                    {lead.email}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={lead.status}
                    />
                  </td>

                  <td className="p-4">
                    <SourceBadge
                      source={lead.source}
                    />
                  </td>

                  <td className="p-4 text-zinc-400">
                    {lead.assignedTo}
                  </td>

                  <td className="p-4 text-zinc-400">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          onEdit(lead)
                        }
                        className="px-3 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          onDelete(lead)
                        }
                        className="px-3 py-1 rounded-md bg-red-600/20 border border-red-600/40 text-red-400 text-xs"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeadTable;