import { inject, injectable } from "tsyringe";
import { ISpecificationRespository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRespository
  ) {}

  execute({ name, description }: IRequest) {
    const specificationExists = this.specificationRepository.findByName(name);

    if (specificationExists) {
      throw new Error("Specification already exists");
    }

    this.specificationRepository.create({ name, description });
  }
}
