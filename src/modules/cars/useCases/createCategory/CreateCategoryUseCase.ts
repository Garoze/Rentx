import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExist = await this.categoriesRepository.findByName(name);

    if (categoryExist) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
