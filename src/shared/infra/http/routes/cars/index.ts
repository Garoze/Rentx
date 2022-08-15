import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

export const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle);
