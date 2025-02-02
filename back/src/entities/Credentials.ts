import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "credentials" })
export class Credentials {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  username: string;
  @Column({ length: 100 })
  password: string;
}
