import  { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AutenticateUserController";

const authenticatedRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticatedRoutes.post("/sessions", authenticateUserController.handle);

export { authenticatedRoutes };