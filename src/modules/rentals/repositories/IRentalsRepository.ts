import { Rental } from "../infra/typeorm/entities/Rental";

import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";

export interface IRentalsRepository {
  create(data: ICreateRentalsDTO): Promise<Rental | null>;
  findOpenRentalByCarId(car_id: string): Promise<Rental | null>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | null>;
  findById(id: string): Promise<Rental | null>;
}
