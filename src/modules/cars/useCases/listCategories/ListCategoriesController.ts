import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    return response.json(await listCategoriesUseCase.execute());
  }
}
