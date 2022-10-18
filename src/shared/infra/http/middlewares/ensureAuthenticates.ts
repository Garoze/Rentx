import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request, 
  _response: Response, 
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  
  const [, token] = authHeader.split(" ");
 
  try {
    const { sub: user_id } = verify(token, auth.secret_refresh) as IPayload;

    // const user = await usersRepository.findById(user_id);
    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);
    
    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = { id: user_id };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
