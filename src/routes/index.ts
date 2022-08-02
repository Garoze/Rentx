import { Router } from "express";

import { categoriesRoutes } from './categories'

export const router = Router();

router.use("/categories", categoriesRoutes);
