import type { model } from "./types";

export const programmerElement: model = {
    canInfluenceOutput: true,
    creatable: true,
    recursiveDeleteProperties: [],
    deletable: true,
    properties: [
        {
            name: "id",
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
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "selected",
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
    canInfluenceOutput: true,
    creatable: true,
    properties: [
        {
            name: "id",
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
            type: 'number',
            gettable: true,
            settable: true,
        },
        {
            name: "effects",
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
            optional: true,
            type: "attributes",
            gettable: true,
            settable: true,
        },
        {
            name: "programmerElement",
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