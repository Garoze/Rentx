import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/impls/DayJSDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJSDateProvider;
let mailProvider: MailProviderInMemory;

describe("SendForgotPasswordMail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayJSDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    )
  });

  it("should be able to send a forgot password mail", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "TestUser",
      email: "testmail@rentx.com",
      password: "12345",
      driver_license: "12345"
    }) 
    
    await sendForgotPasswordMailUseCase.execute("testmail@rentx.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("randommail@provider.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should create a user token", async () => {
    const token = jest.spyOn(userTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      name: "TestUser2",
      email: "testmail2@rentx.com",
      password: "12345",
      driver_license: "12345"
    }) 

    await sendForgotPasswordMailUseCase.execute("testmail2@rentx.com");

    expect(token).toHaveBeenCalled();
  });
});
