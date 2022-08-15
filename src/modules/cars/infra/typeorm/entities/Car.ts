import { v4 as uuid } from "uuid";

export class Car {
  public id: string;
  public description: string;
  public daily_rate: number;
  public available: boolean;
  public license_plate: string;
  public fine_amount: number;
  public brand: string;
  public category_id: string;
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
