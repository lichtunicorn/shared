import type { modelName } from "../database/structure/types";

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
    { name: "empty", displayName: "Empty", source: false, requiresSourceModel: false, destination: true, value: false, emptyOptions: true },
    { name: "copy", displayName: "Copy", source: true, requiresSourceModel: true, destination: true, value: false, emptyOptions: true },
    { name: "move", displayName: "Move", source: true, requiresSourceModel: true, destination: false, value: true, emptyOptions: true },
    { name: "delete", displayName: "Delete", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true },

    { name: "select", displayName: "Select", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: false },
    { name: "record", displayName: "Record", source: false, requiresSourceModel: false, destination: true, value: false, emptyOptions: true },
    { name: "set", displayName: "Set", source: true, requiresSourceModel: false, destination: false, value: true, emptyOptions: true },
    { name: "setAttribute", displayName: "Set attribute", source: true, requiresSourceModel: false, destination: false, value: true, emptyOptions: false },

    { name: "go", displayName: "Go", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true }, // no value for go, because you can also go a specific cue from a cuelist
    { name: "release", displayName: "Release", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: true },
    { name: "assign", displayName: "Assign", source: true, requiresSourceModel: true, destination: true, value: false, emptyOptions: true },
    { name: "open", displayName: "Open", source: true, requiresSourceModel: true, destination: false, value: false, emptyOptions: false },
] as const satisfies readonly operation[];

export const getOperation = {
    name: "get", displayName: "Get", source: true, requiresSourceModel: false, destination: false, value: false, emptyOptions: true
} as const satisfies operation;

export type partialValue = Partial<{
    type: "value";
    value: string | number | boolean | null;
} | {
    type: "not";
    value: partialValue;
} | {
    type: "now";
} | {
    type: "combineArrays";
    value1: partialValue;
    value2: partialValue;
} | {
    type: "excludeFromArray";
    value: partialValue;
    exclude: partialValue;
} | {
    type: "getCommand";
    command: {
        operation?: "get";
        options?: {};
        source?: Partial<z.infer<typeof directReference>>;
        subSources?: partialSubReference[];
    };
} | {
    type: "mathDualExpression";
    value1: partialValue;
    value2: partialValue;
    operator: "add" | "subtract" | "multiply" | "divide" | "mod" | "exponent";
} | {
    type: "mathUnaryExpression";
    value: partialValue;
    operator: "squareRoot";
}>;

type valueMathDualExpressionOperator = {
    operator: string;
    displayName: string;
    short: string;
};

export const valueMathDualExpressionOperators = [
    { operator: "add", displayName: "Add", short: "+" },
    { operator: "subtract", displayName: "Subtract", short: "-" },
    { operator: "multiply", displayName: "Multiply", short: "*" },
    { operator: "divide", displayName: "Divide", short: "/" },
    { operator: "mod", displayName: "Mod", short: "mod" },
    { operator: "exponent", displayName: "Exponent", short: "^" },
] as const satisfies readonly valueMathDualExpressionOperator[];

export const value = z.union([
    z.object({
        type: z.literal("value"),
        value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
    }),
    z.object({
        type: z.literal("not"),
        get value() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("now")
    }),
    z.object({
        type: z.literal("combineArrays"),
        get value1() { return value }, // get because of recursiveness
        get value2() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("excludeFromArray"),
        get value() { return value }, // get because of recursiveness
        get exclude() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("getCommand"),
        get command() { // get because of recursiveness
            return getCommand;
        }
    }),
    z.object({
        type: z.literal("mathDualExpression"),
        operator: z.enum(valueMathDualExpressionOperators.map(({ operator }) => operator)),
        get value1() { return value }, // get because of recursiveness
        get value2() { return value } // get because of recursiveness
    }),
    z.object({
        type: z.literal("mathUnaryExpression"),
        operator: z.enum(["squareRoot"]),
        get value() { return value }
    })
]);

type directReferenceContextType = {
    name: string;
    modelName: modelName;
    displayName: string;
}

export const directReferenceContextTypes = [
    { name: "scene", modelName: "scene", displayName: "Scene" },
    { name: "cuelist", modelName: "cuelist", displayName: "Cuelist" },
    { name: "cue", modelName: "cue", displayName: "Cue" },
    { name: "collection", modelName: "collection", displayName: "Collection" },

    { name: "fixture", modelName: "fixture", displayName: "Fixture" },
    { name: "variable", modelName: "variable", displayName: "Variable" },
    { name: "speedGroup", modelName: "speedGroup", displayName: "Speed group" },
    { name: "section", modelName: "section", displayName: "Section" },

    { name: "show", modelName: "show", displayName: "Show" },
    { name: "calledMacro", modelName: "macro", displayName: "Called macro" },
    { name: "executingMacro", modelName: "macro", displayName: "Executing macro" },
    { name: "executingMacroCommand", modelName: "macroCommand", displayName: "Executing macro command" },
] as const satisfies readonly directReferenceContextType[];

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

export type partialSubReference = Partial<{
    type: "key";
    key: string;
} | {
    type: "getUniqueFromArray";
    key: string;
    value: partialValue;
} | {
    type: "filter";
    key: string;
    value: partialValue;
} | {
    type: "every";
}>;

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
    operation: z.enum(["move"]),
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
    operation: z.enum(["delete", "go", "release"]),
    source: directReference,
    subSources: z.array(subReference),
    options: z.object({}),
});

export const selectCommand = z.object({
    operation: z.literal("select"),
    source: directReference,
    subSources: z.array(subReference),
    options: z.object({
        additive: z.boolean(),
    }),
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
    operation: z.enum(["empty", "record"]),
    destination: directReference,
    subDestinations: z.array(subReference),
    options: z.object({}),
});

export const sourceDestinationCommand = z.object({
    // copy has destination (and not value), because you can for example copy from scene to cuelist
    operation: z.enum(["copy", "assign"]),
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
    selectCommand,
    openCommand,
    destinationCommand,
    sourceDestinationCommand,
]);
