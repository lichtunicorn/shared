import type z from "zod";
import type { kind } from "../../kinds";
import type { subKindSchema } from "../fixtureTypes/schema";

export type param = z.infer<typeof subKindSchema> & {
    values: number[] | string[] | boolean[];
}

export type programmerState = {
    chosenKind: kind;
    currentPage: number;
    pages: param[][];
};