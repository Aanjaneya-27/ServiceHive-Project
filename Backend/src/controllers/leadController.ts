import { Request, Response } from "express";
import  Lead  from "../models/leadModel";

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const lead = await Lead.create(
      req.body
    );

    res.status(201).json(lead);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const leads = await Lead.find();

    res.status(200).json(leads);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const updatedLead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedLead);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Lead Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};