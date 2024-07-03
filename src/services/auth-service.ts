import { authResponse, loginRequest, registerRequest, toAuthResponse } from "../models/user";
import { authSchema } from "../validation/auth-validation";
import { validate } from "../validation/validate";
import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    static async register(req: registerRequest): Promise<authResponse> {
        const validated = validate(authSchema.register, req);

        const nameExist = await prismaClient.user.count({
            where: {
                name: validated.name,
            },
        });

        if (nameExist != 0) throw new ResponseError(400, "name already exists");

        const hashed = await bcrypt.hash(validated.password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: validated.name,
                password: hashed,
                is_admin: validated.is_admin,
            },
        });

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.SECRET_KEY!, {
            expiresIn: "1d",
        });

        return toAuthResponse(token, user);
    }

    static async login(req: loginRequest): Promise<authResponse> {
        const validated = validate(authSchema.login, req);

        const user = await prismaClient.user.findUnique({
            where: {
                name: validated.name,
            },
        });

        if (!user) throw new ResponseError(401, "user not registered yet");

        const isEqual = await bcrypt.compare(validated.password, user.password);

        if (!isEqual) throw new ResponseError(401, "name/password is invalid");

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.SECRET_KEY!, {
            expiresIn: "1d",
        });

        return toAuthResponse(token);
    }
}
