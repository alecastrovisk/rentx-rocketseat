import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list  all available cars", async() => {
    const car = await carsRepositoryInMemory.create({
      "name": "Catromovel 2",
      "description": "carro familia",
      "daily_rate": 10000,
      "license_plate": "ACR8888",
      "fine_amount": 100,
      "brand": "chevrolet",
      "category_id": "e4a108cf-d58a-4728-ad36-edb30793540d"
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list a car by brand", async() => {
    const car = await carsRepositoryInMemory.create({
      "name": "Catromovel",
      "description": "carro familia",
      "daily_rate": 10000,
      "license_plate": "ACR8888",
      "fine_amount": 100,
      "brand": "chevrolet",
      "category_id": "e4a108cf-d58a-4728-ad36-edb30793540d"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "chevrolet",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list a car by name", async() => {
    const car = await carsRepositoryInMemory.create({
      "name": "Catromovel2",
      "description": "carro familia",
      "daily_rate": 10000,
      "license_plate": "ACR8889",
      "fine_amount": 100,
      "brand": "chevrolet",
      "category_id": "e4a108cf-d58a-4728-ad36-edb30793540d"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "chevrolet",
    });
  
    expect(cars).toEqual([car]);
  });

  it("Should be able to list a car by category", async() => {
    const car = await carsRepositoryInMemory.create({
      "name": "Catromovel",
      "description": "carro familia",
      "daily_rate": 10000,
      "license_plate": "ACR8888",
      "fine_amount": 100,
      "brand": "chevrolet",
      "category_id": "12345category"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345category",
    });

    expect(cars).toEqual([car]);
  });
});