import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { createInflateRaw } from "zlib";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  })

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarName",
      description: "A Test car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Test",
      category_id: "category_id"
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "TestSpec",
      description: "A Test spec"
    });
    
    const specifications_id = [specification.id as string];

    const specificationsCar = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non existing car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"]

    await expect(
      createCarSpecificationUseCase.execute({
        car_id, 
        specifications_id
      })
    ).rejects.toEqual(new AppError("Car does not exists"));
  })
})

