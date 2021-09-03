import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../entities/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
        
   async execute({ description, name }: IRequest ): Promise<void> {
       try {
        const categoryAlreadyExists = await this.categoriesRepository
        .findByName(
            name
         );
 
         if(categoryAlreadyExists) {
             throw new AppError('Category exists');
         }
 
         this.categoriesRepository.create({ name, description });
       } catch (error) {
           throw new AppError('erro ao criar');
       }
   } 
}

export { CreateCategoryUseCase };