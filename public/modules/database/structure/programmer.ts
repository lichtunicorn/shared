import type { model } from "./types";

export const programmerElement: model = {
    canSetAttribute: true,
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
        },
        {
            name: "group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "contents",
            type: "array",
            valueType: {
                reference: "programmerElementContent"
            },
            gettable: true,
            settable: false,
        },
    ]
};

export const programmerElementContent: model = {
    canSetAttribute: true,
    creatable: true,
    recursiveDeleteProperties: ['attributes'],
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
            unique: true,
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
        },
        {
            name: "preset",
            optional: true,
            type: {
                reference: "preset"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "attributes",
            optional: true,
            type: "array",
            valueType: {
                reference: "attribute"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "programmerElement",
            backReference: true,
            type: {
                reference: "programmerElement"
            },
            gettable: true,
            settable: false,
        }
    ]
};