import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, {
      name, 
      email, 
      password, 
      driver_license,
    })

    this.users.push(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    
    return user ? user : null;
  }
}
