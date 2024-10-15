import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Credentials } from "./Credentials";
import { Appointments } from "./Appointment";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: "date" })
  birthdate: Date;
  @Column("integer")
  dni: number;
  @Column({ nullable: true, type: "text" })
  profileImg: string | null;
  @OneToOne(() => Credentials)
  @JoinColumn()
  credentials: Credentials;
  @OneToMany(() => Appointments, (appointment) => appointment.user)
  appointments: Appointments[];
}
