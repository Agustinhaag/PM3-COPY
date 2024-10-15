import { CustomError } from "../catch/classError";
import { credentialModel, userModel } from "../config/data-source";
import ICredentialDto from "../dtos/CredentialDto";
import { Credentials } from "../entities/Credentials";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "../utils/validate";

export const createCredentials = async (credential: ICredentialDto) => {
  const { username, password } = credential;
  const user: User | null = await userModel.findOneBy({
    email: username,
  });
  if (!username || !password || !user) {
    throw new CustomError(
      "Error al crear usuario, verifique los datos ingresados",
      400
    );
  }
  const hashPassword = await bcrypt.hash(password, 8);
  const newCredential: Credentials = await credentialModel.create({
    username,
    password: hashPassword,
  });
  await credentialModel.save(newCredential);
  user.credentials = newCredential;
  await userModel.save(user);
  return newCredential.id;
};

export const loginCredentials = async (
  credential: ICredentialDto
): Promise<User | null> => {
  const { username, password } = credential;

  if (!username || !password) {
    throw new CustomError("Ingrese las credenciales requeridas", 400);
  } else if (validateEmail(username) === false) {
    throw new CustomError("Email inválido", 400);
  } else if (validatePassword(password) === false) {
    throw new CustomError("La contraseña no cumple con los requisitos", 400);
  }

  const credentialVerify: Credentials | null = await credentialModel.findOne({
    where: { username },
  });
  const isPasswordValid =
    credentialVerify && credentialVerify.password
      ? await bcrypt.compare(password, credentialVerify.password)
      : false;

  if (!credentialVerify || !isPasswordValid) {
    throw new CustomError("Credenciales incorrectas", 400);
  }
  const user: User | null = await userModel.findOne({
    where: { email: username },
  });
  return user;
};
