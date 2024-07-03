import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message,
        });
    } else {
        res.status(500).json({
            errors: "Internal Server Error",
        });
    }
}
