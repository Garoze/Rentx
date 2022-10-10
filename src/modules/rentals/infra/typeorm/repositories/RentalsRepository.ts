<<<<<<< HEAD
import { IsNull, Repository } from "typeorm";
=======
import { Repository, IsNull } from "typeorm";
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)

import { Rental } from "../entities/Rental";
import { AppDataSource } from "@shared/infra/typeorm";

import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create({ 
    car_id, 
    user_id, 
    expected_return_date,
    id,
    end_date,
    total
  }: ICreateRentalsDTO): Promise<Rental | null> {

    const newRental = this.repository.create({ 
      car_id, 
      user_id, 
      expected_return_date,
<<<<<<< HEAD
      id,
=======
      id, 
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)
      end_date,
      total
    });
    
    await this.repository.save(newRental);

    return newRental;
  }
  
  async findOpenRentalByCarId(car_id: string): Promise<Rental | null> {
    return await this.repository.findOne({ 
      where: { car_id, end_date: IsNull() }
    }) ;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | null> {
<<<<<<< HEAD
    return await this.repository.findOne({ 
=======
    return await this.repository.findOne({
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)
      where: { user_id, end_date: IsNull() }
    });
  }

  async findById(id: string): Promise<Rental | null> {
<<<<<<< HEAD
    return await this.repository.findOne({ where: { id }});
  }

  async findByUserId(user_id: string): Promise<Rental[] | null> {
    const rental = await this.repository.find({
      where: { user_id },
      relations: ["car"]
    }) 
=======
    const rental = await this.repository.findOne({ where: { id } });
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)

    return rental || null; 
  }
}
