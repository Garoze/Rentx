import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Test Car 01",
      daily_rate: 150,
      license_plate: "TDD-0001",
      fine_amount: 100,
      brand: "car",
      category_id: "category_id"
    })

    const carList = await listAvailableCarsUseCase.execute({});

    expect(carList).toEqual([ createdCar ]);
  })

  it("should be able to list all available cars by name", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: "car_name_test",
      description: "Test Car 01",
      daily_rate: 150,
      license_plate: "TDD-0001",
      fine_amount: 100,
      brand: "brand_test",
      category_id: "category_id"
    })

    const carList = await listAvailableCarsUseCase.execute({
      name: "car_name_test"
    });

    expect(carList).toEqual([ createdCar ]);
  })

  it("should be able to list all available cars by brand", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: "car_name_test",
      description: "Test Car 01",
      daily_rate: 150,
      license_plate: "TDD-0001",
      fine_amount: 100,
      brand: "brand_test",
      category_id: "category_id"
    })

    const carList = await listAvailableCarsUseCase.execute({
      brand: "brand_test"
    });

    expect(carList).toEqual([ createdCar ]);
  })

  it("should be able to list all available cars by category_id", async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: "car_name_test",
      description: "Test Car 01",
      daily_rate: 150,
      license_plate: "TDD-0001",
      fine_amount: 100,
      brand: "brand_test",
      category_id: "12345"
    })

    const carList = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });

    expect(carList).toEqual([ createdCar ]);
  })
})
