import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";



interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  lincense_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }
  async execute({
    name,
    description,
    daily_rate,
    lincense_plate,
    fine_amount,
    brand,
    category_id
  }: IRequest): Promise<Car> {

    const carAlreadyExists = await this.carsRepository.findCarByLicensePlate(
      lincense_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      fine_amount,
      lincense_plate,
      daily_rate,
      description,
      name
    });

    return car;
  }
}

export { CreateCarUseCase };