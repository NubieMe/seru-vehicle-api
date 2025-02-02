import { brandResponse } from "./brand";
import { modelResponse } from "./model";
import { priceResponse } from "./pricelist";
import { typeResponse } from "./type";
import { yearResponse } from "./year";

export type pageRequest = {
    page: number;
};

export type metadata = {
    total: number;
    limit: number;
    offset: number;
    current_page: number;
    total_pages: number;
};

export type data = brandResponse[] | typeResponse[] | modelResponse[] | yearResponse[] | priceResponse[];

export type pageResponse = {
    data: data;
    metadata: metadata;
};

export function toPageResponse(data: data, total: number, skip: number): pageResponse {
    return {
        data,
        metadata: {
            total,
            limit: 5,
            offset: skip,
            current_page: skip % 5 == 0 ? (skip + 5) / 5 : Math.floor(skip + 5) / 5 + 1,
            total_pages: total % 5 === 0 ? total / 5 : Math.floor(total / 5) + 1,
        },
    };
}
