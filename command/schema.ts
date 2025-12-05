import { z } from "zod";

export const mathOperators = ["add", "subtract", "multiply", "divide", "mod", "exponent"]

export const value = z.union([
    z.object({
        type: z.literal("value"),
        value: z.union([z.string(), z.number(), z.boolean()]),
    }),
    z.object({
        type: z.literal("getCommand"),
        get command() { // get because of recursiveness
            return getCommand;
        }
    }),
    z.object({
        type: z.literal("mathDualExpression"),
        operator: z.union(mathOperators.map(o => z.literal(o))]),
        get value1() { return value }, // get because of recursiveness
        get value2() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("mathUnaryExpression"),
        operator: z.literal("squareRoot"),
        get value() { return value }
    })
]);

export const directReferenceContexts = [
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
    ];

export const directReference = z.union([
    z.object({
        type: z.literal("reference"),
        reference: z.string(),
        id: z.string(),
    }),
    z.object({
        type: z.literal("context"),
        context: z.union(directReferenceContexts.map(c => z.literal(c)),
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

export const sourceNumberCommand = z.object({
    operation: z.union([z.literal("copy"), z.literal("move")]),
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
    operation: z.union([z.literal("delete"), z.literal("go")]),
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
    operation: z.literal("assign"),
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
    sourceNumberCommand,
    setCommand,
    sourceCommand,
    openCommand,
    destinationCommand,
    sourceDestinationCommand,
]);
