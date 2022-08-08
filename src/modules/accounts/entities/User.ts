import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {

  @PrimaryColumn()
  public id?: string;
  
  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public driver_license: string;

  @Column()
  public isAdmin: boolean;

  @Column()
  public avatar: string;

  @CreateDateColumn() 
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
