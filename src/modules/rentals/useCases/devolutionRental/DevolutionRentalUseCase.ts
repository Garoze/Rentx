import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental?.car_id!);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    )

    if (daily <= 0) daily = 1;

    const delay = this.dateProvider.compareInDays(
      dateNow, 
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      total = delay * car?.fine_amount!;
    }
    total += daily * car?.daily_rate!;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);

    return rental;
  }
}
