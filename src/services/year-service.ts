import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";
import { idRequest } from "../models";
import { pageRequest, pageResponse, toPageResponse } from "../models/page";
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

    static async getAll(req: pageRequest, key?: any, value?: any): Promise<pageResponse> {
        const total = await prismaClient.vehicle_Year.count();

        const skip = 5 * req.page - 5;
        if (!key || !value) {
            const years = await prismaClient.vehicle_Year.findMany({
                skip,
                take: 5,
            });

            return toPageResponse(
                years.map((val) => toYearResponse(val)),
                total,
                skip
            );
        } else {
            const years = await prismaClient.vehicle_Year.findMany({
                skip,
                take: 5,
                where: {
                    [key]: value,
                },
            });

            return toPageResponse(
                years.map((val) => toYearResponse(val)),
                total,
                skip
            );
        }
    }

    static async getOne(req: idRequest): Promise<yearResponse> {
        const year = await prismaClient.vehicle_Year.findUnique({
            where: req,
        });

        if (!year) throw new ResponseError(404, "year not found");

        return toYearResponse(year);
    }

    static async update(req: yearRequest): Promise<yearResponse> {
        const year = await prismaClient.vehicle_Year.count({
            where: {
                id: req.id,
            },
        });

        if (year == 0) throw new ResponseError(404, "year not found");

        const updated = await prismaClient.vehicle_Year.update({
            where: {
                id: req.id,
            },
            data: {
                year: req.year,
            },
        });

        return toYearResponse(updated);
    }

    static async delete(req: idRequest): Promise<yearResponse> {
        const year = await prismaClient.vehicle_Year.count({
            where: req,
        });

        if (year == 0) throw new ResponseError(404, "year not found");

        const deleted = await prismaClient.vehicle_Year.delete({
            where: req,
        });

        return toYearResponse(deleted);
    }
}
