import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental | null> {
    const MIN_RENT_HOURS = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable for rent");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental already open for this user");
    }
      
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < MIN_RENT_HOURS) {
      throw new AppError("The minimum amount of hours for rent is 24");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
