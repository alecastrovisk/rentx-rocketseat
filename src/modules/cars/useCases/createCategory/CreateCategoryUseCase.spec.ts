import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("create category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Alexandre",
            description: "descrição teste"
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );
        expect(categoryCreated).toHaveProperty("id");
    });
    it("Should not be able to create a new category with the same name", async () => {
        expect(async () => {
            const category = {
                name: "Alexandre",
                description: "descrição teste"
            };
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
            
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError); 
    });
});

