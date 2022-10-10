import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  
  it('should be able to create a new category', async () => {
    const newCategory = { 
      name: 'TestCategory', 
      description: 'just a test category' 
    };

    await createCategoryUseCase.execute(newCategory);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(newCategory.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a category with a existing name', async () => {
    const newCategory = { 
      name: 'TestCategory', 
      description: 'just a test category' 
    };

    await createCategoryUseCase.execute(newCategory);


    await expect( createCategoryUseCase.execute(newCategory)).rejects.toEqual(new AppError("Category already exists"));
  });
})
