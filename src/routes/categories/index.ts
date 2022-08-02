import { Router } from "express";

import { CreateCategoryController } from "../../modules/cars/useCases/CreateCategory/CreateCategoryController";

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);
