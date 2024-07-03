import j, { Schema } from "joi";

export class createSchema {
    static readonly createBrand: Schema = j.object({
        name: j.string().min(1).max(20).required(),
    });

    static readonly createType: Schema = j.object({
        name: j.string().min(1).max(20).required(),
        brand_id: j.number().min(1).required(),
    });

    static readonly createModel: Schema = j.object({
        name: j.string().min(1).max(20).required(),
        type_id: j.number().min(1).required(),
    });

    static readonly createYear: Schema = j.object({
        year: j.string().min(1).max(4).required(),
    });

    static readonly pricelist: Schema = j.object({
        code: j.string().min(1).max(20).required(),
        price: j.number().min(1).required(),
        year_id: j.number().min(1).required(),
        model_id: j.number().min(1).required(),
    });
}
