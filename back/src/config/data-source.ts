import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointments } from "../entities/Appointment";
import { Credentials } from "../entities/Credentials";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORD,
  database: process.env.DB,
  // dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Appointments, Credentials],
  subscribers: [],
  migrations: [],
});

export const userModel = AppDataSource.getRepository(User);
export const appointmentModel = AppDataSource.getRepository(Appointments);
export const credentialModel = AppDataSource.getRepository(Credentials);
