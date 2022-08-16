import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { AppDataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

export class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const newCarImage = this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(newCarImage);

    return newCarImage;
  }
}
