import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

import { AppDataSource } from "@shared/infra/typeorm";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;
  
  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async create({ 
    user_id, 
    refresh_token, 
    expires_date 
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    })

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({ where: { user_id, refresh_token } });
    
    return userToken || null;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({ where: { refresh_token }});

    return userToken || null;
  }

  async deleteById(token_id: string): Promise<void> {
    await this.repository.delete(token_id);
  }
}
