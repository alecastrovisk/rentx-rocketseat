import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"




let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create a car specification",() => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to an inexistent car", async() => {

    expect(async() => {
      const car_id = "1234";
      const specifications_id = ["5432"];

      await createCarSpecificationUseCase.execute({
       car_id, 
       specifications_id
      });
     
    }).rejects.toBeInstanceOf(AppError);
  })

  it("Should  be able to add a new specification to a car", async() => {
    const car = await carsRepositoryInMemory.create({
      name: "name test1",
      description: " description test1",
      daily_rate: 100,
      license_plate: "abc123451",
      fine_amount: 100,
      brand: "brand test1",
      category_id: "categoryId test1"
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "teste",
      name: "teste"
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, 
      specifications_id
    });
    
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);

  })
})