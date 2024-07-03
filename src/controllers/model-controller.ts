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
}
