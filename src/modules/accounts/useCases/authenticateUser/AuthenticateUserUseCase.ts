import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //Verificar se o usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new AppError("Email or password incorrect!");
        }
        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if(passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }
        //Gerar o jsonwebtoken

        const token = sign({}, "chavesecreta", {
            subject: user.id,
            expiresIn: "1d"
        });
        return {
            user,
            token
        }
    }

}

export { AuthenticateUserUseCase };