import type { model } from './types';

const manyModelNames: [string, string][] = [
    ["actionButton", "Action buttons"],
    ["collection", "Collections"],
    ["cuelist", "Cuelists"],
    ["effect", "Effects"],
    ["executor", "Executors"],
    ["fixture", "Fixtures"],
    ["group", "Groups"],
    ["macro", "Macros"],
    ["override", "Overrides"],
    ["programmerElement", "Programmer elements"],
    ["scene", "Scenes"],
    ["section", "Sections"],
    ["variable", "Variables"],
];

export const show: model = {
    displayName: "Show",
    common: false,
    creatable: false,
    properties: [
        {
            name: "id",
            displayName: "ID",
            type: "string",
            unique: true,
            default: {
                type: "cuid"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "name",
            displayName: "Name",
            type: "string",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "blind",
            displayName: "Blind",
            type: "boolean",
            default: {
                type: "value",
                value: false
            },
            gettable: true,
            settable: true,
        },
        {
            name: "highlight",
            displayName: "Highlight",
            type: "boolean",
            default: {
                type: "value",
                value: false
            },
            gettable: true,
            settable: true
        },
        ...(manyModelNames.map(([name, displayName]) => ({
            name: name + "s",
            displayName,
            type: "array" as const,
            valueType: {
                reference: name
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        })))
    ]
};