import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {

  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public daily_rate: number;

  @Column()
  public available: boolean;

  @Column()
  public license_plate: string;

  @Column()
  public fine_amount: number;

  @Column()
  public brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  public category: Category;

  @Column()
  public category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }]
  })
  public specifications: Specification[];

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}
