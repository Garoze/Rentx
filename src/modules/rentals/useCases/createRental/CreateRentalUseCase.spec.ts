import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/impls/DayJSDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayJSDateProvider;

describe("Create Rental", () => {
  const dayAdded24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayJSDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, 
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: dayAdded24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayjs().toDate(),
      })
      ).rejects.toEqual(new AppError("The minimum amount of hours for rent is 24"));
  });

  it("should not be able to create a new rental to a rented car", async () => {
      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      });

    await expect( createRentalUseCase.execute({
        car_id: "54321",
        user_id: "19181",
        expected_return_date: dayAdded24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable for rent"));
  });

  it("should not be able to create a rental for a user that already have a rental open", async() => {
      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      });
    await expect(
      createRentalUseCase.execute({
        car_id: "918276",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      })
    ).rejects.toEqual(new AppError("There's a rental already open for this user"));
  });
})
