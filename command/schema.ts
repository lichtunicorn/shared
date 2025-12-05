import { z } from "zod";

const operations = [{
    operation: "copy",
    type: "sourceNumber",
}, {
    operation: "move",
    type: "sourceNumber",
}, {
    operation: "set",
    type: "set"
}, {
operation: "delete",
    type: "source"
}, {
    operation: "go",
    type:"source"
}, {
    operation: "open",
    type: "open"
}, {
    operation: "empty",
    type: "destination"
}, {
    operation: "record",
    type: "destination"
}, {
    operation: "assign",
    type: "sourceDestination"
}, {
    operation: "get",
    type: "get"
}]
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
    operation: z.union(operations.filter(o => o.type === "sourceNumber").map(o => o.operation)),
    source: directReference,
    subSources: z.array(subReference),
    value,
    options: z.object({}),
});

export const setCommand = z.object({
    operation: z.union(operations.filter(o => o.type === "set").map(o => o.operation)),
    source: directReference,
    subSources: z.array(subReference),
    value,
    options: z.object({}),
});

export const sourceCommand = z.object({
    operation: z.union(operations.filter(o => o.type === "source").map(o => o.operation)),
    source: directReference,
    subSources: z.array(subReference),
    options: z.object({}),
});

export const openCommand = z.object({
    operation: z.union(operations.filter(o => o.type === "open").map(o => o.operation)),
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
    operation: z.union(operations.filter(o => o.type === "destination").map(o => o.operation)),
    destination: directReference,
    subDestinations: z.array(subReference),
    options: z.object({}),
});

export const sourceDestinationCommand = z.object({
    operation: z.union(operations.filter(o => o.type === "sourceDestination").map(o => o.operation)),
    source: directReference,
    subSources: z.array(subReference),
    destination: directReference,
    subDestinations: z.array(subReference),
    options: z.object({}),
});

export const getCommand = z.object({
    operation: z.union(operations.filter(o => o.type === "get").map(o => o.operation)),
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
