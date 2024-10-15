import axios from "axios";
import { useSelector } from "react-redux";

export const validarRegister = (input) => {
  const errors = {};
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dniRegex = /^\d{7,8}$/;

  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.dni) {
    errors.dni = "El dni es requerido";
  }
  if (!input.birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  if (input.password && !passwordRegex.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número";
  }
  if (input.birthdate && !birthdateRegex.test(input.birthdate)) {
    errors.birthdate = "La fecha seleccionada es inválida";
  }
  if (input.dni && !dniRegex.test(input.dni)) {
    errors.dni = "Ingrese un dni válido";
  }

  return errors;
};

export const validarLogin = (input) => {
  const errors = {};
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.username) {
    errors.username = "El username es requerido";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }

  if (input.username && !emailRegex.test(input.username)) {
    errors.username = "El username es inválido";
  }
  return errors;
};

export const validateAppointment = async (input) => {
  const selectedDate = new Date(input.date);
  const selectedTime = new Date(`2024-01-01 ${input.time}:00`);
  const errors = {};
  if (!input.date) {
    errors.date = "La fecha es requerida";
  }
  if (!input.time) {
    errors.time = "La hora es requerida";
  }
  if (!input.description) {
    errors.description = "La descripción es requerida";
  }

  if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
    errors.date = "Los turnos no están disponibles los sábados ni domingos.";
  }

  if (selectedDate < new Date()) {
    errors.date = "No puedes seleccionar una fecha anterior a hoy";
  }
  if (selectedTime.getHours() < 9 || selectedTime.getHours() > 17) {
    errors.time = "La hora debe estar entre las 09:00 y las 17:00";
  }
  const response = await axios.get(
    `https://date.nager.at/api/v3/publicholidays/2024/AR`
  );
  const holidays = response.data;

  const isHoliday = holidays.some((holiday) => {
    const holidayDate = new Date(holiday.date);
    return (
      holidayDate.getDate() === selectedDate.getDate() &&
      holidayDate.getMonth() === selectedDate.getMonth()
    );
  });

  if (isHoliday) {
    errors.date = "No puedes seleccionar un feriado";
  }
  return errors;
};

export const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour < 17; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    options.push(`${hourStr}:00`, `${hourStr}:30`);
  }
  options.push("17:00");
  return options;
};
export const timeOptions = generateTimeOptions();

export const validarContact = (input) => {
  const errors = {};
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.message) {
    errors.message = "El mensaje es requerido";
  }

  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  return errors;
};
