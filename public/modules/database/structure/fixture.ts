import type { model } from './types';

export const fixture: model = {
    canInfluenceOutput: true,
    creatable: true,
    deletable: true,
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
            name: "fixtureNumber",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "fixtureType",
            type: "string",
            gettable: true,
            settable: false,
        },
        {
            name: "universe",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            gettable: true,
            settable: true,
        },
        {
            name: "address",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            gettable: true,
            settable: true,
        }
    ]
};