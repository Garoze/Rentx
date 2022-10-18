import { v4 as uuid } from 'uuid';
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn 
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
export class UserTokens {

  @PrimaryColumn() 
  public id: string; 

  @Column()
  public refresh_token: string;

  @Column()
  public user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  public user: User;

  @Column()
  public expires_date: Date;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
