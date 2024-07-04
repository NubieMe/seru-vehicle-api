import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { yearRequest } from "../models/year";
import { YearService } from "../services/year-service";

export class YearController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = req.body as yearRequest;
            const response = await YearService.create(request);

            res.status(201).json({
                message: "create year success",
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

            const key = Object.keys(req.query)[1];
            const response = await YearService.getAll(request, key, req.query[key]);

            res.status(200).json({
                message: "get year success",
                data: response.data,
                metadata: response.metadata,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const request = {
                id: Number(req.params.id),
            };
            const response = await YearService.getOne(request);

            res.status(200).json({
                message: "get year success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
