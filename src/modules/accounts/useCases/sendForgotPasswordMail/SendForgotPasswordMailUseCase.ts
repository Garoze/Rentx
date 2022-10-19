import { v4 as uuid } from "uuid";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
export class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UsersRepository")
    private usersrepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUserTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersrepository.findByEmail(email);

    const templatePath = resolve(
      __dirname, 
      "..", 
      "..", 
      "views", 
      "emails", 
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists");
    }
  
    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id!,
      refresh_token: token,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email, 
      "Recuperação de senha", 
      variables,
      templatePath,
    );
  };
}
