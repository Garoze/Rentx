import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: { 
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}
  
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }
    
    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    
    const token = sign({}, "ed1dc1be5398bec09fbd5a38cf04cfcb", {
      subject: user.id,
      expiresIn: "1d"
    });
    
    return { 
      user: {
        name: user.name,
        email: user.email
      },
      token 
    };
  }
}
