import { Router } from "express";

import { categoriesRoutes } from './categories'
import { specificationRoutes } from './specifications';

export const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
