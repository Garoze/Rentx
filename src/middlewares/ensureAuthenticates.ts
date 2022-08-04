import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/impls/UsersRepository";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request, 
  _response: Response, 
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }
  
  const [, token] = authHeader.split(" ");
 
  try {
    const { sub: user_id } = verify(token, "ed1dc1be5398bec09fbd5a38cf04cfcb") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    
    if (!user) {
      throw new Error("User does not exists");
    }

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }

}
