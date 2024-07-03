export type typeRequest = {
    name: string;
    brand_id: number;
};

export type typeResponse = {
    id: number;
    name: string;
    brand: string;
};

export type typeDB = {
    id: number;
    name: string;
    brand: {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    };
};

export function toTypeResponse(type: typeDB): typeResponse {
    return {
        id: type.id,
        name: type.name,
        brand: type.brand.name,
    };
}
