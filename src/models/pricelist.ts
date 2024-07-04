export type priceRequest = {
    id?: number;
    code: string;
    price: number;
    year_id: number;
    model_id: number;
};

export type priceResponse = {
    id: number;
    code: string;
    price: number;
    year: string;
    model: string;
};

export type priceDB = {
    id: number;
    code: string;
    price: number;
    year: {
        id: number;
        year: string;
    };
    model: {
        id: number;
        name: string;
    };
};

export function toPriceResponse(price: priceDB): priceResponse {
    return {
        id: price.id,
        code: price.code,
        price: price.price,
        year: price.year.year,
        model: price.model.name,
    };
}
