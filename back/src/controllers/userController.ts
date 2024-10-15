import { Request, Response } from "express";
import { createUser, getAllUsers, getUser } from "../services/userService";
import { loginCredentials } from "../services/credentialsService";
import { User } from "../entities/User";
import catchAsync from "../catch/catchAsync";

const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await getAllUsers();
  res.status(200).json(users);
};

const getOneUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const user: User | null = await getUser(id);
  const datosUser = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    dni: user?.dni,
    birthdate: user?.birthdate,
    appointments: user?.appointments,
    idCredentiasls: user?.credentials.id,
  };
  res.status(200).json(datosUser);
};

const registerUser = async (req: Request, res: Response) => {
  const { name, email, birthdate, dni, password } = req.body;
  let archivo: any | null;

  if (req.file) {
    archivo = {
      buffer: req.file.buffer,
      contentype: req.file.mimetype,
    };
  } else {
    archivo = null;
  }
  const newUser: User = await createUser(
    {
      name,
      email,
      birthdate,
      dni,
    },
    password,
    archivo
  );
  res.status(201).json(newUser);
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user: User | null = await loginCredentials({ username, password });
  res.status(200).json({ login: true, user });
};

export default {
  getUsers: catchAsync(getUsers),
  getOneUser: catchAsync(getOneUser),
  registerUser: catchAsync(registerUser),
  loginUser: catchAsync(loginUser),
};
