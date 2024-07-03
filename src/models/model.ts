export type modelRequest = {
    id?: number;
    name: string;
    type_id: number;
};

export type modelResponse = {
    id: number;
    name: string;
    type: string;
};

export type modelDB = {
    id: number;
    name: string;
    type: {
        id: number;
        name: string;
    };
};

export function toModelResponse(model: modelDB): modelResponse {
    return {
        id: model.id,
        name: model.name,
        type: model.type.name,
    };
}
