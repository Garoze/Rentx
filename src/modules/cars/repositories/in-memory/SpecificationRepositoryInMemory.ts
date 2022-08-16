import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationDTO, ISpecificationRespository } from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory implements ISpecificationRespository {
  private specifications: Specification[] = [];

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const newSpecification = new Specification(); 

    Object.assign(newSpecification, {
      name,
      description
    });

    this.specifications.push(newSpecification);

    return newSpecification;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find((spec) => spec.name === name);
    return specification || null;
  }

  async findById(ids: string[]): Promise<Specification[] | null> {
    const allSpecifications = this.specifications.filter((spec) => ids.includes(spec.id!));

    return allSpecifications || null;
  }
}
