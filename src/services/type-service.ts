import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { pageRequest, pageResponse, toPageResponse } from "../models/page";
import { toTypeResponse, typeRequest, typeResponse } from "../models/type";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class TypeService {
    static async create(req: typeRequest): Promise<typeResponse> {
        const vaidated = validate(createSchema.createType, req);

        const brandExist = await prismaClient.vehicle_Brand.count({
            where: {
                id: req.brand_id,
            },
        });

        if (brandExist == 0) throw new ResponseError(400, "brand not found");

        const type = await prismaClient.vehicle_Type.create({
            data: req,
            select: {
                id: true,
                name: true,
                brand: true,
            },
        });

        return toTypeResponse(type);
    }

    static async getAll(req: pageRequest, brand_id?: number): Promise<pageResponse> {
        const total = await prismaClient.vehicle_Type.count();

        const skip = 5 * req.page;

        if (!brand_id) {
            const types = await prismaClient.vehicle_Type.findMany({
                skip,
                take: 5,
                select: {
                    id: true,
                    name: true,
                    brand: true,
                },
            });

            return toPageResponse(
                types.map((val) => toTypeResponse(val)),
                total,
                skip
            );
        } else {
            const types = await prismaClient.vehicle_Type.findMany({
                skip,
                take: 5,
                where: {
                    brand_id,
                },
                select: {
                    id: true,
                    name: true,
                    brand: true,
                },
            });

            return toPageResponse(
                types.map((val) => toTypeResponse(val)),
                total,
                skip
            );
        }
    }
}
