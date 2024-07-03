import { Request } from "express";
import { Schema } from "joi";
import { ResponseError } from "../error/response-error";

export function validate<T>(schema: Schema, request: Request): T {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}
