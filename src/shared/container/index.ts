import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoryRepository } from '../../modules/cars/repositories/impls/CategoryRepository';

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoryRepository);
