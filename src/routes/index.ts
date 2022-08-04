import { Router } from "express";

import { categoriesRoutes } from './categories'
import { specificationRoutes } from './specifications';
import { userRoutes } from "./users";

export const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
