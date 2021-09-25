import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "name test1",
      description: " description test1",
      daily_rate: 100,
      license_plate: "abc123451",
      fine_amount: 100,
      brand: "brand test1",
      category_id: "categoryId test1"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create two license plate",async () => {
    expect( async() => {
      await createCarUseCase.execute({
        name: "name test",
        description: " description test",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 100,
        brand: "brand test",
        category_id: "categoryId test"
      });
      
      await createCarUseCase.execute({
        name: "name test",
        description: " description test",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 100,
        brand: "brand test",
        category_id: "categoryId test"
      });
    }).rejects.toBeInstanceOf(AppError);
    
  });
  it("It should to create a car avaible by default", async ()=> {
    const car = await createCarUseCase.execute({
      name: "name available",
      description: " description available",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 100,
      brand: "brand available",
      category_id: "categoryId available"
    });

    expect(car.available).toBe(true);
  });
});