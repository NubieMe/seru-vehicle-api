import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { idRequest } from "../models";
import { pageRequest, pageResponse, toPageResponse } from "../models/page";
import { toTypeResponse, typeRequest, typeResponse } from "../models/type";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class TypeService {
    static async create(req: typeRequest): Promise<typeResponse> {
        const validated = validate(createSchema.createType, req);

        const brandExist = await prismaClient.vehicle_Brand.count({
            where: {
                id: validated.brand_id,
            },
        });

        if (brandExist == 0) throw new ResponseError(404, "brand not found");

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

    static async getOne(req: idRequest): Promise<typeResponse> {
        const type = await prismaClient.vehicle_Type.findUnique({
            where: req,
            select: {
                id: true,
                name: true,
                brand: true,
            },
        });

        if (!type) throw new ResponseError(404, "vehicle type not found");

        return toTypeResponse(type);
    }

    static async update(req: typeRequest): Promise<typeResponse> {
        const type = await prismaClient.vehicle_Type.count({
            where: {
                id: req.id,
            },
        });

        if (type == 0) throw new ResponseError(404, "vehicle type not found");

        const brand = await prismaClient.vehicle_Brand.count({
            where: {
                id: req.brand_id,
            },
        });

        if (brand == 0) throw new ResponseError(404, "brand not found");

        const updated = await prismaClient.vehicle_Type.update({
            where: {
                id: req.id,
            },
            data: req,
            select: {
                id: true,
                name: true,
                brand: true,
            },
        });

        return toTypeResponse(updated);
    }

    static async delete(req: idRequest): Promise<typeResponse> {
        const type = await prismaClient.vehicle_Type.count({
            where: req,
        });

        if (type == 0) throw new ResponseError(404, "vehicle type not found");

        const deleted = await prismaClient.vehicle_Type.delete({
            where: req,
            select: {
                id: true,
                name: true,
                brand: true,
            },
        });

        return toTypeResponse(deleted);
    }
}
