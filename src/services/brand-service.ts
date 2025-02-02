import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { idRequest } from "../models";
import { brandRequest, brandResponse, toBrandResponse } from "../models/brand";
import { pageRequest, pageResponse, toPageResponse } from "../models/page";
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

    static async getAll(req: pageRequest, key?: any, value?: any): Promise<pageResponse> {
        const total = await prismaClient.vehicle_Brand.count();

        const skip = 5 * req.page - 5;

        if (!key || !value) {
            const brands = await prismaClient.vehicle_Brand.findMany({
                skip,
                take: 5,
            });

            return toPageResponse(
                brands.map((val) => toBrandResponse(val)),
                total,
                skip
            );
        } else {
            const brands = await prismaClient.vehicle_Brand.findMany({
                skip,
                take: 5,
                where: {
                    [key]: value,
                },
            });

            return toPageResponse(
                brands.map((val) => toBrandResponse(val)),
                total,
                skip
            );
        }
    }

    static async getOne(req: idRequest): Promise<brandResponse> {
        const brand = await prismaClient.vehicle_Brand.findUnique({
            where: req,
        });

        if (!brand) throw new ResponseError(404, "brand not found");

        return toBrandResponse(brand);
    }

    static async update(req: brandRequest): Promise<brandResponse> {
        let brand = await prismaClient.vehicle_Brand.findUnique({
            where: {
                id: req.id,
            },
        });

        if (!brand) throw new ResponseError(404, "brand not found");

        brand = await prismaClient.vehicle_Brand.update({
            where: {
                id: req.id,
            },
            data: {
                name: req.name,
            },
        });

        return toBrandResponse(brand);
    }

    static async delete(req: idRequest): Promise<brandResponse> {
        const brand = await prismaClient.vehicle_Brand.findUnique({
            where: req,
        });

        if (!brand) throw new ResponseError(404, "brand not found");

        const deleted = await prismaClient.vehicle_Brand.delete({
            where: req,
        });

        return toBrandResponse(deleted);
    }
}
