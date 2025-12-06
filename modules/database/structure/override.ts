import type { model } from './types';

export const override: model = {
    gettable: ['id', 'fixture', 'attributes'],
    settable: [],
    properties: [
        {
            name: "id",
            type: "string",
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