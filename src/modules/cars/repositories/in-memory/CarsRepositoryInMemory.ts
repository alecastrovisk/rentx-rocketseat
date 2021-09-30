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
    name,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand, 
      category_id, 
      fine_amount, 
      license_plate, 
      daily_rate, 
      description, 
      name,
      specifications,
      id
    });

    this.cars.push(car);
    return car;
  }

  async findCarByLicensePlate(license_plate: string):Promise<Car> {
    return this.cars.find(
      (car) => car.license_plate === license_plate
    );
  } 
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
    available = true
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car)=> {
      if(
        car.available === true || 
        ((brand && car.brand === brand)|| 
          (category_id && car.category_id === category_id) ||
          (name && car.name === name))
      ) {
        return car;
      }
      return null;
    });
    
    return carsAvailable;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);
    
    return car;
  }

}

export { CarsRepositoryInMemory };