import type { modelName } from "../database/structure/types";

export type errorInfo = {
    createdAt: number;
    message: string;
    source: string | null;
    showId: string | null;
    model: modelName | null;
};