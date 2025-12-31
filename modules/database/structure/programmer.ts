import type { model } from "./types";

export const programmerElement: model = {
    displayName: "Programmer element",
    canInfluenceOutput: true,
    creatable: true,
    recursiveDeleteProperties: [],
    deletable: true,
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
            name: "index",
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "selected",
            displayName: "Selected",
            type: "boolean",
            default: {
                type: "value",
                value: false
            },
            gettable: true,
            settable: false,
        },
        {
            name: "fixtures",
            displayName: "Fixtures",
            optional: true,
            type: "array",
            valueType: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        },
        {
            name: "group",
            displayName: "Group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        },
        {
            name: "contents",
            displayName: "Contents",
            type: "array",
            valueType: {
                reference: "programmerElementContent"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
    ]
};

export const programmerElementContent: model = {
    displayName: "Programmer element content",
    canInfluenceOutput: true,
    creatable: true,
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
            name: "index",
            displayName: "Index",
            type: 'number',
            gettable: true,
            settable: true,
        },
        {
            name: "effects",
            displayName: "Effects",
            optional: true,
            type: "array",
            valueType: {
                reference: "effect"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "preset",
            displayName: "Preset",
            optional: true,
            type: {
                reference: "preset"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "attributes",
            displayName: "Attributes",
            optional: true,
            type: "attributes",
            gettable: true,
            settable: true,
        },
        {
            name: "programmerElement",
            displayName: "Programmer element",
            backReference: true,
            type: {
                reference: "programmerElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};