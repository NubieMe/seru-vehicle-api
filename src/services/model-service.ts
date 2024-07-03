import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { modelRequest, modelResponse, toModelResponse } from "../models/model";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class ModelService {
    static async create(req: modelRequest): Promise<modelResponse> {
        const validated = validate(createSchema.createModel, req);

        const typeExist = await prismaClient.vehicle_Type.count({
            where: {
                id: validated.type_id,
            },
        });

        if (typeExist == 0) throw new ResponseError(404, "vehicle type not found");

        const modelExist = await prismaClient.vehicle_Model.count({
            where: {
                name: validated.name,
                type_id: validated.type_id,
            },
        });

        if (modelExist != 0) throw new ResponseError(400, "vehicle model already exists");

        const model = await prismaClient.vehicle_Model.create({
            data: validated,
            select: {
                id: true,
                name: true,
                type: true,
            },
        });

        return toModelResponse(model);
    }
}
