import { CustomError } from "../catch/classError";
import { userModel } from "../config/data-source";
import IUserDto from "../dtos/UserDto";
import { User } from "../entities/User";
import { validateEmail, validatePassword } from "../utils/validate";
import { createCredentials } from "./credentialsService";

export const getAllUsers = async (): Promise<User[]> => {
  const users: User[] = await userModel.find({
    relations: { appointments: true },
    order: { id: "ASC" },
  });
  if (!users) throw new CustomError("Error al obtener los turnos", 404);
  return users;
};

export const getUser = async (id: number): Promise<User | null> => {
  const user: User | null = await userModel.findOne({
    where: { id },
    relations: ["appointments", "credentials"],
  });
  if (!user || !id) {
    throw new CustomError("Usuario no encontrado", 404);
  }
  if (user && user.appointments.length > 0) {
    user.appointments.sort((a, b) => b.id - a.id);
  }
  return user;
};

export const createUser = async (
  userData: IUserDto,
  password: string,
  archivo?: { buffer: Buffer; contentype: string }
): Promise<User> => {
  const { name, email, birthdate, dni } = userData;
  if (!name || !email || !birthdate || !dni || !password) {
    throw new CustomError(
      "Error al crear un usuario, verifique los datos ingresados",
      400
    );
  }
  if (validateEmail(email) === false) {
    throw new CustomError("Email inválido", 400);
  }
  if (validatePassword(password) === false) {
    throw new CustomError("La contraseña no cumple con los requisitos", 400);
  }
  const userEmail = await userModel.findOneBy({ email });
  if (userEmail) {
    throw new CustomError("Error al crear un usuario, el email ya existe", 400);
  }

  let profileImg: string | null = null;
  if (archivo) {
    const image = Buffer.from(archivo.buffer).toString("base64");
    const url = `data:image/${archivo.contentype};base64,${image}`;
    profileImg = url;
  }
  const newUser: User = await userModel.create({
    name,
    email,
    birthdate,
    dni,
    profileImg,
  });
  await userModel.save(newUser);
  await createCredentials({ username: email, password });
  return newUser;
};
