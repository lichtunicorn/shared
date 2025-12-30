import type { model } from './types';

export const override: model = {
    displayName: "Override",
    canInfluenceOutput: true,
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
            canInfluenceThisOutput: true,
        },
        {
            name: "attributes",
            type: "attributes",
            gettable: true,
            settable: true,
        },
    ]
};