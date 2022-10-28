import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticates";

import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

export const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar", 
  ensureAuthenticated,
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle
);

userRoutes.get(
  "/profile",
  ensureAuthenticated,
  profileUserController.handle
);
