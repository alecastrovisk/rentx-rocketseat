import { Router } from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
// const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthenticate);

// specificationsRoutes.get('/', listSpecificationsController.handle);
specificationsRoutes.post(
    '/',
    createSpecificationController.handle
);


export { specificationsRoutes };

