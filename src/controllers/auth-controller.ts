import { NextFunction, Request, Response } from "express";
import { registerRequest } from "../models/user";
import { AuthService } from "../services/auth-service";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as registerRequest;
            const response = await AuthService.register(request);

            res.status(201).json({
                message: "register success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
