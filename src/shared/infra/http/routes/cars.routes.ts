import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

import uploadConfig from "../../../../config/upload";


const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRoutes.post(
  "/", 
  ensureAuthenticate, 
  ensureAdmin, 
  createCarController.handle
);

carRoutes.get(
  "/available", 
  listAvailableCarsController.handle
);

carRoutes.post(
  "/specifications/:id", 
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images/:id", 
  upload.array("images"), 
  uploadCarImagesController.handle 
);

export { carRoutes };