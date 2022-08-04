import { Specification } from "../entities/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRespository {
  create({ name, description }: ISpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | null>;
}
