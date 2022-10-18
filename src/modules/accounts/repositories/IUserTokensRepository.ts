import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create({ 
    user_id, 
    refresh_token, 
    expires_date
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | null>;
  deleteById(token_id: string): Promise<void>;
}
