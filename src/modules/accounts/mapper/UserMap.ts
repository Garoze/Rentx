import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    avatar_url,
    driver_license
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id: id!,
      name,
      email,
      avatar,
      avatar_url,
      driver_license
    });

    return user;
  }
}
