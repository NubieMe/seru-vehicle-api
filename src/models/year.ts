import { Vehicle_Year } from "@prisma/client";

export type yearRequest = {
    id?: number;
    year: string;
};

export type yearResponse = {
    id: number;
    year: string;
};

export function toYearResponse(year: Vehicle_Year): yearResponse {
    return {
        id: year.id,
        year: year.year,
    };
}
