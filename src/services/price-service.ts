import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { idRequest } from "../models";
import { pageRequest, pageResponse, toPageResponse } from "../models/page";
import { priceRequest, priceResponse, toPriceResponse } from "../models/pricelist";
import { createSchema } from "../validation/create-validation";
import { validate } from "../validation/validate";

export class PriceService {
    static async create(req: priceRequest): Promise<priceResponse> {
        const validated = validate(createSchema.pricelist, req);

        const priceExist = await prismaClient.pricelist.count({
            where: {
                code: validated.code,
                price: validated.price,
                year_id: validated.year_id,
                model_id: validated.model_id,
            },
        });

        if (priceExist != 0) throw new ResponseError(400, "pricelist already exists");

        const yearExist = await prismaClient.vehicle_Year.count({
            where: {
                id: validated.year_id,
            },
        });

        if (yearExist == 0) throw new ResponseError(400, "year not found");

        const modelExist = await prismaClient.vehicle_Model.count({
            where: {
                id: validated.model_id,
            },
        });

        if (modelExist == 0) throw new ResponseError(400, "model not found");

        const price = await prismaClient.pricelist.create({
            data: validated,
            select: {
                id: true,
                code: true,
                price: true,
                year: true,
                model: true,
            },
        });

        return toPriceResponse(price);
    }

    static async getAll(req: pageRequest, key?: any, value?: any): Promise<pageResponse> {
        const total = await prismaClient.pricelist.count();

        const skip = 5 * req.page;
        if (!key || !value) {
            const pricelists = await prismaClient.pricelist.findMany({
                skip,
                take: 5,
                select: {
                    id: true,
                    code: true,
                    price: true,
                    year: true,
                    model: true,
                },
            });

            return toPageResponse(
                pricelists.map((val) => toPriceResponse(val)),
                total,
                skip
            );
        } else {
            const pricelists = await prismaClient.pricelist.findMany({
                skip,
                take: 5,
                where: {
                    [key]: key == "year_id" || "model_id" ? Number(value) : value,
                },
                select: {
                    id: true,
                    code: true,
                    price: true,
                    year: true,
                    model: true,
                },
            });

            return toPageResponse(
                pricelists.map((val) => toPriceResponse(val)),
                total,
                skip
            );
        }
    }

    static async getOne(req: idRequest): Promise<priceResponse> {
        const pricelist = await prismaClient.pricelist.findUnique({
            where: req,
            select: {
                id: true,
                code: true,
                price: true,
                year: true,
                model: true,
            },
        });

        if (!pricelist) throw new ResponseError(404, "pricelist not found");

        return toPriceResponse(pricelist);
    }

    static async update(req: priceRequest): Promise<priceResponse> {
        const pricelist = await prismaClient.pricelist.count({
            where: {
                id: req.id,
            },
        });

        if (pricelist == 0) throw new ResponseError(400, "pricelist not found");

        const yearExist = await prismaClient.vehicle_Year.count({
            where: {
                id: req.year_id,
            },
        });

        if (yearExist == 0) throw new ResponseError(400, "year not found");

        const modelExist = await prismaClient.vehicle_Model.count({
            where: {
                id: req.model_id,
            },
        });

        if (modelExist == 0) throw new ResponseError(400, "model not found");

        const updated = await prismaClient.pricelist.update({
            where: {
                id: req.id,
            },
            data: req,
            select: {
                id: true,
                code: true,
                price: true,
                year: true,
                model: true,
            },
        });

        return toPriceResponse(updated);
    }
}
