import type { model } from './types';

export const override: model = {
    creatable: true,
    deletable: true,
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
            name: "fixture",
            type: {
                reference: "fixture"
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