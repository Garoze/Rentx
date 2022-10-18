import { container } from 'tsyringe';

import "@shared/container/providers";

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ISpecificationRespository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', 
  CategoryRepository
);

container.registerSingleton<ISpecificationRespository>(
  'SpecificationRepository', 
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  "CarsImagesRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUserTokensRepository>(
  "UsersTokensRepository",
  UserTokensRepository
)
