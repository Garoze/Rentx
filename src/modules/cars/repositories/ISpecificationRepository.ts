import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRespository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | null>;
  findById(ids: string[]): Promise<Specification[] | null>;
}
