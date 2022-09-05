import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getTreeRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const newCar = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    }) 

    await this.repository.save(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.repository.findOne({ where: { license_plate } });
  }

  async findAvailable(
    name?: string, 
    brand?: string, 
    category_id?: string, 
  ): Promise<Car[] | null> {
    const carsQuery = this.repository.createQueryBuilder("cars")
      .where("available = :available", { available: true });
    
    if (name)
      carsQuery.andWhere("cars.name = :name", { name });

    if (brand)
      carsQuery.andWhere("cars.brand = :brand", { brand });

    if (category_id)
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });

    const carList = await carsQuery.getMany();

    return carList;
  }

  async findById(car_id: string): Promise<Car | null> {
    const car = await this.repository.findOne({ where: { id: car_id }});
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder() 
      .update()
      .set({ available })
      .where("id = :id", { id })
      .execute()
  }
}
