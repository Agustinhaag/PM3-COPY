import nodemailer from "nodemailer";

export const sendConfirmationEmail = async (appointment: any) => {
  const {user, description, time, date} = appointment
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "agushaag30@gmail.com",
          pass: "Kevingston24",
        },
      });

      const emailContent = {
        to: user.email,
        subject: "Confirmación de turno",
        html: `
          <p>Hola ${user.name},</p>
          <p>Has reservado un nuevo turno para el ${date} a las ${time}.</p>
          <p>Descripción del turno: ${description}</p>
          <p>Si necesitas cancelar tu turno, puedes hacerlo en el siguiente enlace: http://localhost:4000/appointments//</p>
          <p>Atentamente,</p>
          <p>El equipo de AH bank</p>
        `,
      };

      await transporter.sendMail(emailContent);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };