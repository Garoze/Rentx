import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";
import { ensureAdmin } from "../../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

export const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", 
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
