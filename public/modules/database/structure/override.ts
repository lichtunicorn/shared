import type { model } from './types';

export const override: model = {
    creatable: true,
    gettable: ['id', 'fixture', 'attributes'],
    settable: ['fixture'],
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
        },
        {
            name: "fixture",
            type: {
                reference: "fixture"
            }
        },
        {
            name: "attributes",
            type: "array",
            valueType: {
                reference: "attribute"
            }
        }
    ]
};