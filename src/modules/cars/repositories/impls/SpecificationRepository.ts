import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRespository,
} from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRespository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationDTO): void {
    const newSpecification = new Specification();

    Object.assign(newSpecification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(newSpecification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
