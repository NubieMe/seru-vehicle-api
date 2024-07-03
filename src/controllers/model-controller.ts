import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { modelRequest } from "../models/model";
import { ModelService } from "../services/model-service";

export class ModelController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = req.body as modelRequest;
            const response = await ModelService.create(request);

            res.status(201).json({
                message: "create vehicle model success",
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
            const key = Object.keys(req.query)[1];
            const response = await ModelService.getAll(request, key, req.query[key]);

            res.status(200).json({
                message: "get vehicle model success",
                data: response.data,
                metadata: response.metadata,
            });
        } catch (error) {
            next(error);
        }
    }
}
