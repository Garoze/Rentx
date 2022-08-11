import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
export class Category {

  @PrimaryColumn()
  public id?: string;
  
  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn() 
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
