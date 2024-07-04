import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { toYearResponse, yearRequest, yearResponse } from "../models/year";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class YearService {
    static async create(req: yearRequest): Promise<yearResponse> {
        const validated = validate(createSchema.createYear, req);

        const yearExist = await prismaClient.vehicle_Year.count({
            where: {
                year: validated.year,
            },
        });

        if (yearExist != 0) throw new ResponseError(400, "year already exists");

        const year = await prismaClient.vehicle_Year.create({
            data: validated,
        });

        return toYearResponse(year);
    }
}
