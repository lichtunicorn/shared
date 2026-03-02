import type z from "zod";
import type { kind } from "../../kinds";
import type { subKindSchema } from "../fixtureTypes/schema";

export type programmerState = {
    chosenKind: kind;
    currentParams: z.infer<typeof subKindSchema>[];
    currentPage: number;
    currentPageParams: z.infer<typeof subKindSchema>[];
    totalPages: number;
};