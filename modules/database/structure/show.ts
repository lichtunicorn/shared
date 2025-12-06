import type { model } from './types';

export const show: model = {
    gettable: ['id', 'name'],
    settable: ['name'],
    properties: [
        {
            name: "id",
            type: "string",
            default: {
                type: "cuid"
            },
        },
        {
            name: "name",
            type: "string",
            unique: true
        },
        ...([
            "section",
            "scene",
            "cuelist",
            "group",
            "override",
            "macro",
            "effect",
            "collection",
            "variable"
        ].map(name => ({
            name: name + "s",
            type: "array" as const,
            valueType: {
                reference: name
            },
        })))
    ]
};