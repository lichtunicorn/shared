import { z } from "zod";

export const operations = [
    { name: "copy", source: true, destination: true, value: false, emptyOptions: true },
    { name: "move", source: true, destination: false, value: true, emptyOptions: true },
    { name: "set", source: true, destination: false, value: true, emptyOptions: true },
    { name: "delete", source: true, destination: false, value: false, emptyOptions: true },
    { name: "go", source: true, destination: false, value: false, emptyOptions: true }, // no value for go, because you can also go a specific cue from a cuelist
    { name: "open", source: true, destination: false, value: false, emptyOptions: false },
    { name: "empty", source: false, destination: true, value: false, emptyOptions: true },
    { name: "record", source: false, destination: true, value: false, emptyOptions: true },
    { name: "assign", source: true, destination: true, value: false, emptyOptions: true },
    { name: "select", source: true, destination: false, value: false, emptyOptions: true }
] as const;

export const value = z.union([
    z.object({
        type: z.literal("value"),
        value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
    }),
    z.object({
        type: z.literal("getCommand"),
        get command() { // get because of recursiveness
            return getCommand;
        }
    }),
    z.object({
        type: z.literal("mathDualExpression"),
        operator: z.union([z.literal("add"), z.literal("subtract"), z.literal("multiply"), z.literal("divide"), z.literal("mod"), z.literal("exponent")]),
        get value1() { return value }, // get because of recursiveness
        get value2() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("mathUnaryExpression"),
        operator: z.literal("squareRoot"),
        get value() { return value }
    })
]);

export const directReferenceContextTypes = [
    "show",
    "section",
    "scene",
    "cuelist",
    "cue",
    "speedGroup",
    "variable",
    "executingMacro",
    "calledMacro",
    "executingMacroCommand",
    "collection",
    "fixture",
] as const;

export const directReference = z.union([
    z.object({
        type: z.literal("reference"),
        reference: z.string(),
        id: z.string(),
    }),
    z.object({
        type: z.literal("references"),
        reference: z.string(),
        ids: z.array(z.string()),
    }),
    z.object({
        type: z.literal("context"),
        context: z.union(directReferenceContextTypes.map(contextType => z.literal(contextType))),
    })
]);

export const subReference = z.union([
    z.object({
        type: z.literal("key"),
        key: z.string(),
    }),
    z.object({
        type: z.literal("getUniqueFromArray"),
        key: z.string(),
        value
    }),
]);

export const sourceValueCommand = z.object({
    operation: z.literal("move"),
    source: directReference,
    subSources: z.array(subReference),
    value,
    options: z.object({}),
});

export const setCommand = z.object({
    operation: z.literal("set"),
    source: directReference,
    subSources: z.array(subReference),
    value,
    options: z.object({}),
});

export const sourceCommand = z.object({
    operation: z.union([z.literal("delete"), z.literal("select"), z.literal("go")]),
    source: directReference,
    subSources: z.array(subReference),
    options: z.object({}),
});

export const openCommand = z.object({
    operation: z.literal("open"),
    source: directReference,
    subSources: z.array(subReference),
    options: z.union([
        z.object({
            all: z.literal(true),
        }),
        z.object({
            all: z.literal(false),
            clients: z.array(z.string()),
        }),
    ]),
})

export const destinationCommand = z.object({
    operation: z.union([z.literal("empty"), z.literal("record")]),
    destination: directReference,
    subDestinations: z.array(subReference),
    options: z.object({}),
});

export const sourceDestinationCommand = z.object({
    // copy has destination (and not value), because you can for example copy from scene to cuelist
    operation: z.union([z.literal("copy"), z.literal("assign")]),
    source: directReference,
    subSources: z.array(subReference),
    destination: directReference,
    subDestinations: z.array(subReference),
    options: z.object({}),
});

export const getCommand = z.object({
    operation: z.literal("get"),
    source: directReference,
    subSources: z.array(subReference),
    options: z.object({}),
});

export const noGetCommand = z.union([
    sourceValueCommand,
    setCommand,
    sourceCommand,
    openCommand,
    destinationCommand,
    sourceDestinationCommand,
]);
