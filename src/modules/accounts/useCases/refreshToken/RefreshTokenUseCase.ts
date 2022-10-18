import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import auth from "@config/auth";

import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email }=  verify(token, auth.secret_refresh) as IPayload;
    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh Token does not exists");
    }
   
    await this.usersTokensRepository.deleteById(userToken.id);
    
    const expires_date = this.dateProvider.addDays(auth.expiresDays_refresh);

    const refresh_token = sign({ email }, auth.secret_refresh, {
      subject: sub,
      expiresIn: auth.expiresIn_refresh
    });
    
    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date
    });

    return refresh_token;
  }
}
