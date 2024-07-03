import { NextFunction, Request, Response } from "express";
import { brandRequest } from "../models/brand";
import { BrandService } from "../services/brand-service";

export class BrandController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as brandRequest;
            const response = await BrandService.create(request);

            res.status(201).json({
                message: "vehicle brand created",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
