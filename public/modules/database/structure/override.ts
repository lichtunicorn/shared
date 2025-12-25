import type { model } from './types';

export const override: model = {
    creatable: true,
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
            name: "fixture",
            type: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "attributes",
            type: "attributes",
            optional: true,
            gettable: true,
            settable: false,
        },
        {
            name: "effects",
            type: "array",
            valueType: {
                reference: "effect"
            },
            optional: true,
            gettable: true,
            settable: false,
        },
    ]
};