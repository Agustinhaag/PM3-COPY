import nodemailer from "nodemailer";
import { Appointments } from "../entities/Appointment";
import "dotenv/config";

const emailHelper = async (appointment: Appointments) => {
  const key = process.env.KEYGMAIL
  const { description, date, time, user } = appointment;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agushaag30@gmail.com",
      pass: key,
    },
  });

  const mailOptions = {
    from: "agushaag30@gmail.com",
    to: user.email,
    subject: "Confirmación de turno",
    text: `Hola ${user.name}!
         Te confirmamos que tu cita ha sido creada para el ${date} a las ${time}.
         Descripción: ${description}.
         Podes cancelar tu turno ingresando aqui: http://localhost:4000/appointments`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default emailHelper;
