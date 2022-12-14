import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";
import { ensureAdmin } from "../../middlewares/ensureAdmin";

const upload = multer({
  dest: './tmp',
});

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);


categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import", 
  upload.single('file'), 
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);
