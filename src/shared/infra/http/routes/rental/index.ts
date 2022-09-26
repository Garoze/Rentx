import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

export const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post(
  "/", 
  ensureAuthenticated,
  createRentalController.handle
);

rentalRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
