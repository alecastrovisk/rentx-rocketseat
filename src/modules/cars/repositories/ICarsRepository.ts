import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";


interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findCarByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string, 
    name?: string, 
    category_id?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;

}

export { ICarsRepository };