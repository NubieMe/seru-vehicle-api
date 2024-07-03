import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { brandRequest, brandResponse, toBrandResponse } from "../models/brand";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class BrandService {
    static async create(req: brandRequest): Promise<brandResponse> {
        const validated = validate(createSchema.createBrand, req);

        const brandExist = await prismaClient.vehicle_Brand.count({
            where: {
                name: validated.name,
            },
        });

        if (brandExist != 0) throw new ResponseError(400, "brand name already exists");

        const brand = await prismaClient.vehicle_Brand.create({
            data: validated,
        });

        return toBrandResponse(brand);
    }
}
