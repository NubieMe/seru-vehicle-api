import j, { Schema } from "joi";

export class authSchema {
    static readonly register: Schema = j.object({
        name: j.string().min(1).max(100).required(),
        password: j.string().min(1).max(100).required(),
        is_admin: j.boolean().default(false),
    });

    static readonly login: Schema = j.object({
        name: j.string().min(1).max(100).required(),
        password: j.string().min(1).max(100).required(),
    });
}
