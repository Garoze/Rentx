import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '../../modules/cars/repositories/impls/CategoryRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/impls/SpecificationRepository';
import { ISpecificationRespository } from '../../modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', 
  CategoryRepository
);

container.registerSingleton<ISpecificationRespository>(
  'SpecificationRepository', 
  SpecificationRepository
);
