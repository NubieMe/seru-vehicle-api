import express from "express";
import { AuthController } from "../controllers/auth-controller";
import { BrandController } from "../controllers/brand-controller";
import { auth } from "../middlewares/auth";
import { TypeController } from "../controllers/type-controller";
import { ModelController } from "../controllers/model-controller";
import { YearController } from "../controllers/year-controller";

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
routes.get("/type", auth, TypeController.getAll);
routes.get("/type/:id", auth, TypeController.getOne);
routes.put("/type/:id", auth, TypeController.update);
routes.delete("/type/:id", auth, TypeController.delete);

// model API
routes.post("/model", auth, ModelController.create);
routes.get("/model", auth, ModelController.getAll);
routes.get("/model/:id", auth, ModelController.getOne);
routes.put("/model/:id", auth, ModelController.update);
routes.delete("/model/:id", auth, ModelController.delete);

// year API
routes.post("/year", auth, YearController.create);
routes.get("/year", auth, YearController.getAll);
