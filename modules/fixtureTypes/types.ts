import z from "zod";
import { kinds } from "../../kinds";

const subKindOptionIconSchema = z.union([
    z.null().meta({ description: "No icon" }),
    z.object({
        type: z.literal('image').meta({ description: "One of the predefined images" }),
        image: z.union([
            z.literal("open").meta({ description: "Icon with the word open" }),
            z.literal("3CirclesStacked").meta({ description: "Icon with 3 circles stacked in a triangle shape" }),
            z.literal("lampOn").meta({ description: "Icon with a lamp on" }),
            z.literal("lampOff").meta({ description: "Icon with a lamp off" }),
            z.literal("resetAll").meta({ description: "Reset all icon" }),
            z.literal("resetMotor").meta({ description: "Reset motor icon" }),
            z.literal("resetColor").meta({ description: "Reset color icon" }),
            z.literal("resetGobo").meta({ description: "Reset color icon" }),
            z.literal("resetBeam").meta({ description: "Reset beam icon" }),
            z.literal("resetIntensity").meta({ description: "Reset intensity icon" }),
        ])
    }),
    z.object({
        type: z.literal('color').meta({ description: "An icon with a specific color" }),
        hex: z.string().meta({ description: "The hex string of the color" })
    })
]);

const subKindSchema = z.union([
    z.object({
        name: z.string(),
        type: z.literal("percentage"),
        builtIn: z.enum(["intensity", "red", "green", "blue", "white", "strobe"]),
        default: z.literal(0),
    }),
    z.object({
        name: z.string(),
        type: z.literal("percentage"),
        builtIn: z.enum(["red", "green", "blue", "white"]),
        default: z.literal(100),
    }),
    z.object({
        name: z.string(),
        type: z.literal("percentage"),
        builtIn: z.enum(["focus", "iris", "zoom"]),
        default: z.number(),
    }),
    z.object({
        name: z.string(),
        type: z.literal("percentage"),
        builtIn: z.null(),
        default: z.number(),
    }),
    z.object({
        name: z.string(),
        type: z.literal("number"),
        builtIn: z.enum(["pan", "tilt"]),
        unit: z.literal("degrees"),
        min: z.number(),
        max: z.number(),
        default: z.literal(0),
    }),
    z.object({
        name: z.string(),
        type: z.literal("number"),
        builtIn: z.literal("strobe"),
        unit: z.literal("hertz"),
        min: z.number(),
        max: z.number(),
        default: z.literal(0),
    }),
    z.object({
        name: z.string(),
        type: z.literal("number"),
        builtIn: z.null(),
        unit: z.union([z.null(), z.enum(["hertz", "degrees"])]),
        min: z.number(),
        max: z.number(),
        default: z.number(),
    }),
    z.object({
        name: z.string(),
        type: z.literal("string"),
        builtIn: z.null(),
        default: z.string(),
    }),
    z.object({
        name: z.string(),
        type: z.literal("boolean"),
        builtIn: z.null(),
        default: z.boolean(),
    }),
    z.object({
        name: z.string(),
        type: z.literal("options"),
        builtIn: z.union([z.null(), z.literal("control")]),
        default: z.string(),
        options: z.array(
            z.object({
                name: z.string(),
                displayName: z.string(),
                icon: subKindOptionIconSchema,
            })
        ),
    }),
]);

export const infoSchema = z.object({
    displayName: z.string(),
    channels: z.number(),
    kinds: z.partialRecord(
        z.enum(kinds),
        z.array(subKindSchema)
    )
});

export type fixtureInfoType = z.infer<typeof infoSchema>;

export type publicFixtureType = fixtureInfoType & { name: string };