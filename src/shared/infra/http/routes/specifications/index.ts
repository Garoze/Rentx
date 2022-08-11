import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

export const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);
