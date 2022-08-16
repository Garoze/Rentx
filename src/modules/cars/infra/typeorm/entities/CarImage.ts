import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("cars_image")
export class CarImage {
  @PrimaryColumn()
  public id: string;

  @Column()
  public car_id: string;

  @Column()
  public image_name: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
