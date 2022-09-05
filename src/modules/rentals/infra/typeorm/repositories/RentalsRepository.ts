import { Repository } from "typeorm";

import { Rental } from "../entities/Rental";
import { AppDataSource } from "@shared/infra/typeorm";

import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalsDTO): Promise<Rental | null> {
    const newRental = this.repository.create({ car_id, user_id, expected_return_date });
    
    await this.repository.save(newRental);

    return newRental;
  }
  
  async findOpenRentalByCarId(car_id: string): Promise<Rental | null> {
    return await this.repository.findOne({ where: { car_id }}) ;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | null> {
    return await this.repository.findOne({ where: { user_id }});
  }

  async findById(id: string): Promise<Rental | null> {
    return await this.repository.findOne({ where: { id }});
  }
}
