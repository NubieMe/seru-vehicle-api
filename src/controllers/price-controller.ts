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
}
