import { v4 as uuid } from "uuid";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
export class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UsersRepository")
    private usersrepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersrepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }
  
    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });
  };
}
