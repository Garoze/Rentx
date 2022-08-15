import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";
import { ensureAdmin } from "../../middlewares/ensureAdmin";

export const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
