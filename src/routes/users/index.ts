import { Router } from "express";

import { CreateUsersController } from "../../modules/accounts/useCases/createUser/CreateUserController";

export const userRoutes = Router();

const createUserController = new CreateUsersController();

userRoutes.post("/", createUserController.handle);
