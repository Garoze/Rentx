import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("rentals")
export class Rental {

  @PrimaryColumn()
  public id: string;

  @Column()
  public car_id: string;
  
  @Column()
  public user_id: string;

  @Column()
  public start_date: Date;

  @Column()
  public end_date : Date;

  @Column()
  public expected_return_date: Date;

  @Column()
  public total: number;
  
  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
