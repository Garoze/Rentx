import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ISpecificationRespository } from '@modules/cars/repositories/ISpecificationRepository';

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
