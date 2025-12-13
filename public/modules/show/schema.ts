import { z } from "zod";

export const showData = z.object({
    id: z.string(),
    name: z.string()
});

export const showDataInput = showData.omit({ id: true });
