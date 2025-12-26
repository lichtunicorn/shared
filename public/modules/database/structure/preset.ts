import type { model } from './types';

export const preset: model = {
    creatable: true,
    move: 'index',
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
            type: "attributes",
            gettable: true,
            settable: true,
        }
    ]
};