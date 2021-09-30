import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository{
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      id
    });

    await this.repository.save(car);

    return car;
  }
  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
       license_plate 
      });

    return car;
  }
  async findAvailable(
    brand?: string, 
    category_id?: string,
    name?: string 
  ): Promise<Car[]> {
    const carQuery = await this.repository
    .createQueryBuilder("c")
    .where("available = :available", { available: true });

    if(brand) {
      carQuery.andWhere("brand = :brand", { brand });
    }
    
    if(name) {
      carQuery.andWhere("name = :name", { name });
    }

    if(category_id) {
      carQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carQuery.getMany();
    
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

}

export { CarsRepository };