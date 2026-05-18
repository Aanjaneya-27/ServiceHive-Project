import { useState } from "react";

import Button from "../UI/Button";

import {
  type Lead,
  type LeadFormData,
  type LeadSource,
  type LeadStatus,
} from "../../types/lead";

interface LeadFormProps {
  initialData?: Lead;

  onSubmit: (
    data: LeadFormData
  ) => void;

  onClose: () => void;
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

const LeadForm = ({
  initialData,
  onSubmit,
  onClose,
}: LeadFormProps) => {

  const [formData, setFormData] =
    useState<LeadFormData>({
      name:
        initialData?.name || "",

      email:
        initialData?.email || "",

      status:
        initialData?.status || "New",

      source:
        initialData?.source || "Website",

      assignedTo:
        initialData?.assignedTo || "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.assignedTo
    ) {

      setError(
        "All fields are required"
      );

      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <div>

        <label className="block mb-2 text-sm">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 outline-none focus:border-violet-500"
        />

      </div>

      <div>

        <label className="block mb-2 text-sm">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 outline-none focus:border-violet-500"
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="block mb-2 text-sm">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2"
          >

            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block mb-2 text-sm">
            Source
          </label>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2"
          >

            {sources.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div>

        <label className="block mb-2 text-sm">
          Assigned To
        </label>

        <input
          type="text"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 outline-none focus:border-violet-500"
        />

      </div>

      <div className="flex justify-end gap-3 pt-2">

        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit">

          {initialData
            ? "Update Lead"
            : "Create Lead"}

        </Button>

      </div>

    </form>
  );
};

export default LeadForm;