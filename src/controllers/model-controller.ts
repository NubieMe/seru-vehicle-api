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

            if (isNaN(request.page) || request.page < 1) throw new ResponseError(400, "invalid page input");

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

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const request = {
                id: Number(req.params.id),
            };
            const response = await ModelService.getOne(request);

            res.status(200).json({
                message: "get vehicle model success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = {
                id: Number(req.params.id),
                name: req.body.name,
                type_id: req.body.type_id,
            };
            const response = await ModelService.update(request);

            res.status(200).json({
                message: "update vehicle model success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = {
                id: Number(req.params.id),
            };
            const response = await ModelService.delete(request);

            res.status(200).json({
                message: "delete vehicle model success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
