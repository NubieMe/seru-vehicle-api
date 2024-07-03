import { Vehicle_Brand } from "@prisma/client";

export type brandRequest = {
    name: string;
};

export type brandResponse = {
    id: number;
    name: string;
};

export function toBrandResponse(brand: Vehicle_Brand): brandResponse {
    return {
        id: brand.id,
        name: brand.name,
    };
}
