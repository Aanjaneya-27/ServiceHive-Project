import {
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../services/Api";

import {
  type Lead,
  type LeadFormData,
} from "../types/lead";

import Button from "../components/UI/Button";
import LeadFilters from "../components/leads/LeadsFilter";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadsTable";
import Modal from "../components/UI/Modal";
import StatCard from "../components/dashboard/Statecard";

const Dashboard = () => {

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const fetchLeads = async () => {

    try {

      const res =
        await API.get("/leads");

      setLeads(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {

    return leads.filter((lead) => {

      const matchSearch =
        lead.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        lead.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus = status
        ? lead.status === status
        : true;

      const matchSource = source
        ? lead.source === source
        : true;

      return (
        matchSearch &&
        matchStatus &&
        matchSource
      );

    });

  }, [
    leads,
    search,
    status,
    source,
  ]);

  const handleCreateLead = async (
    data: LeadFormData
  ) => {

    try {

      const res =
        await API.post(
          "/leads",
          data
        );

      setLeads([
        res.data,
        ...leads,
      ]);

      setOpenModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  const handleEditLead = async (
    data: LeadFormData
  ) => {

    if (!selectedLead) return;

    try {

      const res =
        await API.put(
          `/leads/${selectedLead._id}`,
          data
        );

      const updatedLeads =
        leads.map((lead) =>
          lead._id ===
          selectedLead._id
            ? res.data
            : lead
        );

      setLeads(updatedLeads);

      setSelectedLead(null);

      setOpenModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  const handleDeleteLead = async (
    lead: Lead
  ) => {

    try {

      await API.delete(
        `/leads/${lead._id}`
      );

      const filteredLeads =
        leads.filter(
          (item) =>
            item._id !== lead._id
        );

      setLeads(filteredLeads);

    } catch (error) {

      console.log(error);

    }
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <nav className="h-16 bg-zinc-900 border-b border-zinc-800 px-6 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          SmartLeads
        </h1>

        <Button
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </nav>

      <main className="p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Leads Dashboard
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Track and manage customer leads
            </p>

          </div>

          <Button
            onClick={() => {

              setSelectedLead(null);

              setOpenModal(true);

            }}
          >
            + New Lead
          </Button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <StatCard
            label="Total Leads"
            value={leads.length}
          />

          <StatCard
            label="New"
            value={
              leads.filter(
                (lead) =>
                  lead.status ===
                  "New"
              ).length
            }
          />

          <StatCard
            label="Qualified"
            value={
              leads.filter(
                (lead) =>
                  lead.status ===
                  "Qualified"
              ).length
            }
          />

          <StatCard
            label="Lost"
            value={
              leads.filter(
                (lead) =>
                  lead.status ===
                  "Lost"
              ).length
            }
          />

        </div>

        <LeadFilters
          search={search}
          status={status}
          source={source}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSourceChange={setSource}
          onClear={() => {

            setSearch("");

            setStatus("");

            setSource("");

          }}
        />

        <LeadTable
          leads={filteredLeads}
          onEdit={(lead) => {

            setSelectedLead(lead);

            setOpenModal(true);

          }}
          onDelete={handleDeleteLead}
        />

        <Modal
          title={
            selectedLead
              ? "Edit Lead"
              : "Create Lead"
          }
          isOpen={openModal}
          onClose={() => {

            setOpenModal(false);

            setSelectedLead(null);

          }}
        >

          <LeadForm
            initialData={
              selectedLead ||
              undefined
            }
            onClose={() => {

              setOpenModal(false);

            }}
            onSubmit={
              selectedLead
                ? handleEditLead
                : handleCreateLead
            }
          />

        </Modal>

      </main>

    </div>
  );
};

export default Dashboard;