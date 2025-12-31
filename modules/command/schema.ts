import { z } from "zod";
import { kinds } from "../../kinds";

type operation = {
    name: string;
    displayName: string;
    source: boolean;
    requiresSourceModel: boolean;
    destination: boolean;
    value: boolean;
    emptyOptions: boolean;
};

export const operations = [
    { name: "copy", displayName: "Copy", source: true, requiresSourceModel: true, destination: true, value: false, emptyOptions: true },
    { name: "move", displayName: "Move", source: true, requiresSourceModel: true, destination: false, value: true, emptyOptions: true },
    { name: "set", displayName: "Set", source: true, requiresSourceModel: false, destination: false, value: true, emptyOptions: true },
    { name: "delete", displayName: "Delete", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true },
    { name: "go", displayName: "Go", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true }, // no value for go, because you can also go a specific cue from a cuelist
    { name: "open", displayName: "Open", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: false },
    { name: "empty", displayName: "Empty", source: false, requiresSourceModel: false, destination: true, value: false, emptyOptions: true },
    { name: "record", displayName: "Record", source: false, requiresSourceModel: false, destination: true, value: false, emptyOptions: true },
    { name: "assign", displayName: "Assign", source: true, requiresSourceModel: true, destination: true, value: false, emptyOptions: true },
    { name: "select", displayName: "Select", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true },
    { name: "setAttribute", displayName: "Set attribute", source: true, requiresSourceModel: true, destination: false, value: true, emptyOptions: false },
] as const satisfies readonly operation[];

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
    { name: "show", displayName: "Show" },
    { name: "section", displayName: "Section" },
    { name: "scene", displayName: "Scene" },
    { name: "cuelist", displayName: "Cuelist" },
    { name: "cue", displayName: "Cue" },
    { name: "speedGroup", displayName: "Speed group" },
    { name: "variable", displayName: "Variable" },
    { name: "executingMacro", displayName: "Executing macro" },
    { name: "calledMacro", displayName: "Called macro" },
    { name: "executingMacroCommand", displayName: "Executing macro command" },
    { name: "collection", displayName: "Collection" },
    { name: "fixture", displayName: "Fixture" },
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
        context: z.enum(directReferenceContextTypes.map(contextType => contextType.name)),
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
    z.object({
        type: z.literal("filter"),
        key: z.string(),
        value
    }),
    z.object({
        type: z.literal("every"),
    })
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

export const setAttributeCommand = z.object({
    operation: z.literal("setAttribute"),
    source: directReference,
    subSources: z.array(subReference),
    value,
    options: z.object({
        kind: z.union(kinds.map(kind => z.literal(kind))),
        subKind: z.string(),
    }),
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
    setAttributeCommand,
    sourceCommand,
    openCommand,
    destinationCommand,
    sourceDestinationCommand,
]);
