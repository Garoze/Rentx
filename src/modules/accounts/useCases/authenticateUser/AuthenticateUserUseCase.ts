import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from '@errors/AppError';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokenRepository: IUserTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider
  ){}
  
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }
    
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    
    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expiresIn_token,
    });
  
    const refresh_token = sign({ email }, auth.secret_refresh, {
      subject: user.id, 
      expiresIn: auth.expiresIn_refresh,
    });

    const refreshToken_expiresDate = this.dateProvider.addDays(auth.expiresDays_refresh);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshToken_expiresDate 
    });
    
    return { 
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
  }
}
