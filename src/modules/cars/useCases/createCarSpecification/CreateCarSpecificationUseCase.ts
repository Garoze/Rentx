import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRespository
  ) {}

 async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
  const carExist = await this.carsRepository.findById(car_id);

  if (!carExist) {
    throw new AppError("Car does not exists");
  }

   const specifications = await this.specificationRepository.findById(
     specifications_id
   );

   if (specifications)
     carExist.specifications = specifications;

   await this.carsRepository.create(carExist);

   return carExist;
 }
}
