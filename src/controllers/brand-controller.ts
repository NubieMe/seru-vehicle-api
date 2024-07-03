import { NextFunction, Request, Response } from "express";
import { brandRequest } from "../models/brand";
import { BrandService } from "../services/brand-service";
import { pageRequest } from "../models/page";
import { ResponseError } from "../error/response-error";

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

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const request = {
                page: req.query.page ? Number(req.query.page) : 1,
            };
            if (isNaN(request.page) || request.page < 1) throw new ResponseError(400, "invalid page input");
            const response = await BrandService.getAll(request);

            res.status(200).json({
                message: "get brand success",
                data: response.data,
                metadata: response.metadata,
            });
        } catch (error) {
            next(error);
        }
    }
}
