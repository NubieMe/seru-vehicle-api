import { Schema } from "joi";
import { ResponseError } from "../error/response-error";

export function validate<T>(schema: Schema, data: T): T {
    const result = schema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}
