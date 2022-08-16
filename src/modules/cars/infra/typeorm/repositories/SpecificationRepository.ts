import { In, Repository } from "typeorm";

import { Specification } from "../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRespository,
} from "../../../repositories/ISpecificationRepository";

import { AppDataSource } from "@shared/infra/typeorm";

export class SpecificationRepository implements ISpecificationRespository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const newSpecification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newSpecification);

    return newSpecification;
  }

  async findByName(name: string): Promise<Specification | null> {
    return await this.repository.findOne({ where: { name } });
  }

  async findById(ids: string[]): Promise<Specification[] | null> {
    return await this.repository.findBy({ id: In(ids) });
  }
}
