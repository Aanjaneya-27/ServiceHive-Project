export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Lost";

export type LeadSource =
  | "Website"
  | "Instagram"
  | "Referral";

export interface Lead {
  _id: string;

  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  assignedTo: string;

  createdAt: string;
}

export interface LeadFormData {
  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  assignedTo: string;
}