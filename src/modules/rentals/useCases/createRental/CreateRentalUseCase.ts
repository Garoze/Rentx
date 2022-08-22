import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

dayjs.extend(utc);

export class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental | null> {
    const MINRENTHOURS = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable for rent");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental already open for this user");
    }
      
    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
    const dateNowFormat = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNowFormat, "hours");

    if (compare < MINRENTHOURS) {
      throw new AppError("The minimum amount of hours for rent is 24");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });

    return rental || null;
  }
}
