import { Request, Response } from "express";
import {
  appointDelete,
  appointUpdate,
  createAppointment,
  getAppointments,
  getOneAppointment,
} from "../services/appointmentService";
import { Appointments } from "../entities/Appointment";
import catchAsync from "../catch/catchAsync";

const getAppoints = async (req: Request, res: Response) => {
  const appointments: Appointments[] = await getAppointments();
  res.status(200).json(appointments);
};

const getOneAppoint = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const appoint: Appointments | null = await getOneAppointment(id);
  res.status(200).json(appoint);
};

const createAppoint = async (req: Request, res: Response) => {
  const { date, time, description, userId } = req.body;

  const appoint: Appointments = await createAppointment(
    { date, time, description, userId }
  );
  res.status(201).json(appoint);
};

const updateAppoint = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await appointUpdate(id);
  res.status(200).json({ message: "Turno cancelado exitosamente" });
};

// Extra credit
const deleteAppointment = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  await appointDelete(id);
  res.status(200).json({ message: "Turno eliminado exitosamente" });
};

export default {
  getAppoints: catchAsync(getAppoints),
  getOneAppoint: catchAsync(getOneAppoint),
  createAppoint: catchAsync(createAppoint),
  updateAppoint: catchAsync(updateAppoint),
  deleteAppointment: catchAsync(deleteAppointment),
};
