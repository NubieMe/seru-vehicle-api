import express from "express";
import { AuthController } from "../controllers/auth-controller";

export const routes = express.Router();

routes.post("/register", AuthController.register);
