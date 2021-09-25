import { Router } from 'express';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();


categoriesRoutes.post(
    '/',
  ensureAuthenticate, 
  ensureAdmin, 
  createCategoryController.handle
);
categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };