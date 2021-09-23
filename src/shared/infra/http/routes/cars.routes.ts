import { Router } from "express";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";


const carRoutes = Router();

const createCarController = new CreateCategoryController();

carRoutes.post("/", createCarController.handle);

export { carRoutes };