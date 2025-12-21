import type { model } from './types';

export const fixture: model = {
    creatable: true,
    gettable: ['id', 'fixtureNumber', 'universe', 'address', 'fixtureType'],
    settable: ['fixtureNumber', 'universe', 'address'],
    deletable: true,
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
            name: "fixtureNumber",
            type: "number",
            unique: true
        },
        {
            name: "fixtureType",
            type: "string"
        },
        {
            name: "universe",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "address",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        }
    ]
};