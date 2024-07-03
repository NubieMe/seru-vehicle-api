import j, { Schema } from "joi";

export class authSchema {
    private readonly register: Schema = j.object({
        name: j.string().min(1).max(100).required(),
        password: j.string().min(1).max(100).required(),
        is_admin: j.boolean().default(false),
    });

    private readonly login: Schema = j.object({
        name: j.string().min(1).max(100).required(),
        password: j.string().min(1).max(100).required(),
    });
}
