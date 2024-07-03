import express from "express";
import { AuthController } from "../controllers/auth-controller";
import { BrandController } from "../controllers/brand-controller";
import { auth } from "../middlewares/auth";
import { TypeController } from "../controllers/type-controller";

export const routes = express.Router();

// user API
routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);

// brand API
routes.post("/brand", auth, BrandController.create);
routes.get("/brand", auth, BrandController.getAll);
routes.get("/brand/:id", auth, BrandController.getOne);
routes.put("/brand/:id", auth, BrandController.update);
routes.delete("/brand/:id", auth, BrandController.delete);

// type API
routes.post("/type", auth, TypeController.create);
