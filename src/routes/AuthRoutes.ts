import { Router } from "express";
import AuthController from "../app/controllers/AuthController";
const authRouter = Router();

authRouter.post("/login", AuthController.login);

export default authRouter;
