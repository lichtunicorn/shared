import type { modelName } from "../database/structure/types";

export type errorInfo = {
    error: Error;
    source: string | null;
    showId: string | null;
    model: modelName | null;
};