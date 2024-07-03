import express from "express";
import { AuthController } from "../controllers/auth-controller";
import { BrandController } from "../controllers/brand-controller";

export const routes = express.Router();

// user API
routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);

// brand API
routes.post("/brand", BrandController.create);
routes.get("/brand", BrandController.getAll);
routes.get("/brand/:id", BrandController.getOne);
routes.put("/brand/:id", BrandController.update);
routes.delete("/brand/:id", BrandController.delete);
