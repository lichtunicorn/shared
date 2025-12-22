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
    gettable: ['id', 'name', ...manyModelNames.map(name => name + "s")],
    settable: ['name'],
    properties: [
        {
            name: "id",
            type: "string",
            unique: true,
            default: {
                type: "cuid"
            },
        },
        {
            name: "name",
            type: "string",
            unique: true
        },
        ...(manyModelNames.map(name => ({
            name: name + "s",
            type: "array" as const,
            valueType: {
                reference: name
            },
        })))
    ]
};