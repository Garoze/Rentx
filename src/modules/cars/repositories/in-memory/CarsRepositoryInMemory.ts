import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

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
    const newCar = new Car();

    Object.assign(newCar, {
      name, 
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });

    this.cars.push(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car || null;
  }

  async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[] | null> {
    const carList = this.cars.filter((car) => {
      if ( car.available === true || (
          (name && car.name === name) ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id))
      ) {
        return car 
      }
      return null; 
    })

    return carList;
  }

  async findById(car_id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === car_id);
    return car || null;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index].available = available;
  }
}
