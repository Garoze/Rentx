import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

export const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
