import { container } from "tsyringe";

import { CategoriesRepository } from '../../modules/cars/entities/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/entities/repositories/ICategoriesRepository';
import { SpecificationsRepository } from "../../modules/cars/entities/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/entities/repositories/ISpecificationsRespository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);


