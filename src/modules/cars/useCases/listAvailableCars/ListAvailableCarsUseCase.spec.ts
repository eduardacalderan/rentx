import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car description",
      daily_rate: 110.0,
      license_plate: "DEF_1234",
      fine_amount: 40,
      brand: "car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "car description",
      daily_rate: 110.0,
      license_plate: "DEF_1235",
      fine_amount: 40,
      brand: "car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_test",
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "car description",
      daily_rate: 110.0,
      license_plate: "DEF_1236",
      fine_amount: 40,
      brand: "car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "car3" });

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "car description",
      daily_rate: 110.0,
      license_plate: "DEF_1236",
      fine_amount: 40,
      brand: "car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
