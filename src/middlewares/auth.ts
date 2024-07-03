import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({
            errors: "please login first!",
        });

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY!);
        res.locals.session = verified;

        next();
    } catch (error) {
        res.status(401).json({ errors: "token is not valid" });
    }
}
