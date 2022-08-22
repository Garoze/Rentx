import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;


describe("Create Rental", () => {
  const dayAdded24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
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
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental to a rented car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      });

      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "19181",
        expected_return_date: dayAdded24hours,
      })
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental for a user that already have a rental open", async() => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "54321",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      });

      await createRentalUseCase.execute({
        car_id: "918276",
        user_id: "12345",
        expected_return_date: dayAdded24hours,
      })
    }).rejects.toBeInstanceOf(AppError);
  });
})
