import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


class CreateCarSpecificationController {

  async handle(request: Request, response: Response):Promise<Response>{
    const { specifications_id } = request.body;
    const { car_id } = request.params;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    });

    return response.json(cars);

  }
}

export { CreateCarSpecificationController };