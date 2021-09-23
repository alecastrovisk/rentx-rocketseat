import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories2/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase; 

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory
        );
    });

    it("Should be able to authenticate an user", async() => {
        const user: ICreateUserDTO = {
            name: "User test",
            driver_license: "123456",
            email: "usertest@gmail.com",
            password: "12345"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");

    });

    it("Should not be able to authenticate an inexistent user", async() => {
        expect(async() => {
            const result = await authenticateUserUseCase.execute({
                email: "emailfalso@teste.com",
                password: "2344"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with an incorrect password", async() => {
        expect(async() => {
            const user: ICreateUserDTO = {
                name: "Adriano",
                driver_license: "00069696",
                email: "adriano2009@gmail.com",
                password: "craque",
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "senha errada"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})