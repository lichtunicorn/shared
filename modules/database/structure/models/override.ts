import type { model } from '../types';

export const override: model = {
    displayName: "Override",
    canInfluenceOutput: true,
    creatable: true,
    deletable: true,
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Fixture",
            type: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        },
        {
            name: "attributes",
            displayName: "Attributes",
            type: "attributes",
            gettable: true,
            settable: true,
        },
    ]
};