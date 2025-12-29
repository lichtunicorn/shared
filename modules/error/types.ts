import type { modelName } from "../database/structure/types";

export type errorInfo = {
    createdAt: number;
    updatedAt: number;
    count: number;
    message: string;
    source: string | null;
    showId: string | null;
    model: modelName | null;
};