import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  async create({ 
    user_id, 
    refresh_token, 
    expires_date 
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();    

    Object.assign(this.userTokens, {
      user_id,
      refresh_token,
      expires_date
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async deleteById(token_id: string): Promise<void> {
    const token = this.userTokens.find((token) => token.id === token_id);

    this.userTokens.splice(this.userTokens.indexOf(token!));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const token = this.userTokens.find((token) => token.refresh_token === refresh_token);

    return token || null;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null> {
    const token = this.userTokens.find((token) => token.user_id === user_id && token.refresh_token === refresh_token);

    return token || null;
  }
}
