import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase; 
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

 it('should be able to authenticate a user', async () => {
  const newUser: ICreateUserDTO = {
    name: 'TestUser',
    email: 'user@test.com',
    password: '12345789',
    driver_license: '12345678900'
  };

  await createUserUseCase.execute(newUser);

  const result = await authenticateUserUseCase.execute({ 
    email: newUser.email, 
    password: newUser.password 
  });

  expect(result).toHaveProperty('token');
 });

 it('should not be able to authenticate a nonexistent user', () => {
  expect(async () => {
    await authenticateUserUseCase.execute({
      email: "nonexistent@test.com",
      password: "invalidpassword",
    });
  }).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to authenticate a user with incorrect password', async () => {
   expect(async () => {
    const newUser: ICreateUserDTO = {
      name: 'TestUser',
      email: 'user@test.com',
      password: '12345789',
      driver_license: '12345678900'
    };

    await createUserUseCase.execute(newUser);

    await authenticateUserUseCase.execute({ 
      email: newUser.email, 
      password: "incorrectPassword",
    });

   }).rejects.toBeInstanceOf(AppError);
 });
})
