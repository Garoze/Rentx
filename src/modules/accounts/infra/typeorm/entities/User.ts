import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";

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

  @Expose({ name: "avatar_url" })
  avatar_url(): string | null {
    switch (process.env.DISK) {
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
