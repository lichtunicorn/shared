import type { model } from '../types';

export const fixture: model = {
    displayName: "Fixture",
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
            name: "index",
            default: {
                type: 'afterLast'
            },
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "note",
            displayName: "Note",
            type: "string",
            optional: true,
            gettable: true,
            settable: true
        },
        {
            name: "fixtureType",
            displayName: "Fixture type",
            type: "string",
            gettable: true,
            settable: false,
            copyable: true,
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
            copyable: true,
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
            copyable: true,
        }
    ]
};