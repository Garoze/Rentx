import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({ car_id, user_id, expected_return_date }: ICreateRentalsDTO): Promise<Rental | null> {
    const newRental = new Rental(); 
    
    Object.assign(newRental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(newRental);

    return newRental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date 
    ); 

    return rental || null;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date 
    ); 

    return rental || null;
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental || null;
  }
}
