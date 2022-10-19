import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid Token");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date, 
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }
  
    const user = await this.usersRepository.findById(userToken.user_id);
   
    if (user) {
      user.password = await hash(password, 8);

      await this.usersRepository.create(user);
    }

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
