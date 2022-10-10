<<<<<<< HEAD
import { container } from "tsyringe";
import { Request, Response } from "express";

=======
import { Request, Response } from "express";
import { container } from "tsyringe";
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolutionUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionUseCase.execute({
<<<<<<< HEAD
      id, 
=======
      id,
>>>>>>> c8c5012 (fix(tests): Fixed some tests using another repo)
      user_id
    });

    return response.status(200).json(rental);
  }
}
