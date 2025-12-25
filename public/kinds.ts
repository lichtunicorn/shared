export const kinds = [
    "intensity",
    "position",
    "color",
    "beam",
    "control"
] as const;

export type kind = (typeof kinds)[number];