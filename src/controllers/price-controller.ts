import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { priceRequest } from "../models/pricelist";
import { PriceService } from "../services/price-service";

export class PriceController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const isAdmin = res.locals.session.is_admin;
            if (!isAdmin) throw new ResponseError(403, "Forbidden");

            const request = req.body as priceRequest;
            const response = await PriceService.create(request);

            res.status(201).json({
                message: "create pricelist success",
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
            const response = await PriceService.getAll(request, key, req.query[key]);

            res.status(200).json({
                message: "get pricelist success",
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
            const response = await PriceService.getOne(request);

            res.status(200).json({
                message: "get pricelist success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as priceRequest;
            request.id = Number(req.params.id);
            const response = await PriceService.update(request);

            res.status(200).json({
                message: "update pricelist success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
