import { Router } from "express";

import { authenticateRoutes } from "./authenticate";
import { categoriesRoutes } from './categories'
import { specificationRoutes } from './specifications';
import { userRoutes } from "./users";
import { carsRouter } from './cars';
import { rentalRouter } from "./rental";
import { passwordRoutes } from "./password";

export const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRouter);
router.use("/rentals", rentalRouter);
router.use("/password", passwordRoutes);

router.use(authenticateRoutes);
