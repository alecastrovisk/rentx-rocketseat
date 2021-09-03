import express, { Router } from 'express';

import { authenticatedRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes }  from './users.routes';

const router = Router();

router.use(express.json());

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticatedRoutes);

export { router };