import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name, 
    password, 
    email, 
    driver_license,
    avatar, 
    id
  }: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create({
      name, 
      password,
      email,
      driver_license,
      avatar,
      id
    });

    await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({where: { email }});
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id }});
  }
}
