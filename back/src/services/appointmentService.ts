import { CustomError } from "../catch/classError";
import { appointmentModel, userModel } from "../config/data-source";
import IAppointmentDto from "../dtos/IAppointmentDto";
import { Appointments } from "../entities/Appointment";
import sendEmail from "../utils/sendEmail";

export const getAppointments = async (): Promise<Appointments[]> => {
  const appointments: Appointments[] = await appointmentModel.find();
  if (!appointments) throw new CustomError("Error al obtener los turnos", 404);
  return appointments;
};

export const getOneAppointment = async (
  id: number
): Promise<Appointments | null> => {
  const appoint: Appointments | null = await appointmentModel.findOneBy({ id });
  if (!id || !appoint) {
    throw new CustomError("Turno no encontrado", 404);
  } else {
    return appoint;
  }
};

export const createAppointment = async (
  appoint: IAppointmentDto
): Promise<Appointments> => {
  const user = await userModel.findOneBy({ id: appoint.userId });
  if (
    !appoint.date ||
    !appoint.time ||
    !appoint.userId ||
    !appoint.description ||
    !user
  ) {
    throw new CustomError(
      "Error al crear el turno, verifique los datos ingresados",
      400
    );
  } else {
    const newAppoint: Appointments = await appointmentModel.create({
      ...appoint,
      status: true,
    });

    newAppoint.user = user;
    await appointmentModel.save(newAppoint);

    sendEmail(newAppoint);
    return newAppoint;
  }
};

export const appointUpdate = async (id: number): Promise<void> => {
  const appoint: Appointments | null = await appointmentModel.findOneBy({ id });
  if (!id || !appoint) {
    throw new CustomError("Turno no encontrado", 404);
  }

  const now = new Date();
  const appointmentDate = new Date(appoint.date);

  const timeDifference = appointmentDate.getTime() - now.getTime();

  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference < twentyFourHoursInMilliseconds) {
    throw new CustomError("No se puede cancelar el turno con menos de 24 horas de anticipación", 400);
  }

  appoint.status = false;
  await appointmentModel.save(appoint);
};

// Extra credit
export const appointDelete = async (id: number): Promise<void> => {
  const appoint: Appointments | null = await appointmentModel.findOneBy({ id });
  if (!id || !appoint) {
    throw new CustomError("Turno no encontrado", 404);
  }
  await appointmentModel.delete(appoint);
};
