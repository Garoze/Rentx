import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoryRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    
    return category ? category : null;
  }

  async list(): Promise<Category[]> {
    return this.categories; 
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category(); 

    Object.assign(newCategory, {
      name,
      description,
    });

    this.categories.push(newCategory);
  }
}
