import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand, 
    category_id, 
    fine_amount, 
    license_plate, 
    daily_rate, 
    description, 
    name
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand, 
      category_id, 
      fine_amount, 
      license_plate, 
      daily_rate, 
      description, 
      name
    });

    this.cars.push(car);
    return car;
  }

  async findCarByLicensePlate(license_plate: string):Promise<Car> {
    return this.cars.find(
      (car) => car.license_plate === license_plate
    );
  } 

}

export { CarsRepositoryInMemory };