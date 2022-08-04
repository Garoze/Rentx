import { Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRespository,
} from "../ISpecificationRepository";

import { AppDataSource } from "../../../../database";

export class SpecificationRepository implements ISpecificationRespository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const newSpecification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newSpecification);
  }

  async findByName(name: string): Promise<Specification | null> {
    return await this.repository.findOne({ where: { name } });
  }
}
