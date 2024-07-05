import { NextFunction, Request, Response } from "express";
import { typeRequest } from "../models/type";
import { ResponseError } from "../error/response-error";
import { TypeService } from "../services/type-service";

export class TypeController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = req.body as typeRequest;
            const response = await TypeService.create(request);

            res.status(201).json({
                message: "create vehicle type success",
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

            const key = Object.keys(req.query)[0];
            const response = await TypeService.getAll(request, key, req.query[key]);

            res.status(200).json({
                message: "get vehicle type success",
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
            const response = await TypeService.getOne(request);

            res.status(200).json({
                message: "get vehicle type success",
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
                brand_id: req.body.brand_id,
            };
            const response = await TypeService.update(request);

            res.status(200).json({
                message: "update vehicle type success",
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
            const response = await TypeService.delete(request);

            res.status(200).json({
                message: "delete vehicle type success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
