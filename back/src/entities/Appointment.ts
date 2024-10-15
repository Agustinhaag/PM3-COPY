import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "appointments" })
export class Appointments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "date" })
  date: Date;
  @Column({ type: "time" })
  time: Date;
  @Column()
  description: string;
  @Column()
  status: boolean;
  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
