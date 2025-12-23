import type { model } from './types';

export const kinds = [
    "intensity",
    "position",
    "color",
    "beam",
    "control"
] as const;

export const attribute: model = {
    creatable: false,
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
            name: "kind",
            type: "oneOf",
            options: [...kinds],
            gettable: true,
            settable: false,
        },
        {
            name: "subKind",
            type: "string",
            gettable: true,
            settable: false,
        },
        {
            name: "value",
            type: "stringOrNumberOrBooleanOrNull",
            gettable: true,
            settable: true,
        }
    ]
};

export const preset: model = {
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['attributes'],
    selectable: true,
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
            name: "name",
            type: "string",
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "fixtures",
            type: "array",
            optional: true,
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
            name: "attributes",
            type: "array",
            valueType: {
                reference: "attribute"
            },
            gettable: true,
            settable: false,
        }
    ]
};