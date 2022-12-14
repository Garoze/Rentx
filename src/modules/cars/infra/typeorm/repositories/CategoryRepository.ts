import { Repository } from "typeorm";

import { Category } from "../entities/Category";
import { AppDataSource } from "@shared/infra/typeorm";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoryRepository";

export class CategoryRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = this.repository.create({ 
      name, 
      description,
    });

    await this.repository.save(newCategory);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { name: name }});
    return category;
  }
}
