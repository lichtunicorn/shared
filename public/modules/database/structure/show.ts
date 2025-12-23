import type { model } from './types';

const manyModelNames = [
    "actionButton",
    "collection",
    "cuelist",
    "effect",
    "executor",
    "fixture",
    "group",
    "macro",
    "override",
    "programmerElement",
    "scene",
    "section",
    "variable",
];

export const show: model = {
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
            name: "name",
            type: "string",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "blind",
            type: "boolean",
            default: {
                type: "value",
                value: false
            },
            gettable: true,
            settable: true,
        },
        ...(manyModelNames.map(name => ({
            name: name + "s",
            type: "array" as const,
            valueType: {
                reference: name
            },
            gettable: true,
            settable: false,
        })))
    ]
};