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
}
