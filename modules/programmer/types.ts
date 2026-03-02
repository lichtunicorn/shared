import type z from "zod";
import type { kind } from "../../kinds";
import type { subKindSchema } from "../fixtureTypes/schema";

export type programmerState = {
    chosenKind: kind;
    currentPage: number;
    currentParams: z.infer<typeof subKindSchema>[];
};