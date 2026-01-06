import type { model } from './types';

export const fixture: model = {
    displayName: "Fixture",
    common: true,
    canInfluenceOutput: true,
    creatable: true,
    deletable: true,
    selectable: true,
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
            name: "fixtureNumber",
            displayName: "Fixture number",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "fixtureType",
            displayName: "Fixture type",
            type: "string",
            gettable: true,
            settable: false,
        },
        {
            name: "universe",
            displayName: "Universe",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: "address",
            displayName: "Address",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            optional: true,
            gettable: true,
            settable: true,
        }
    ]
};