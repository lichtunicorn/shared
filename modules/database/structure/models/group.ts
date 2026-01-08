import type { model } from '../types';

export const group: model = {
    displayName: "Group",
    common: true,
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['elements'],
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
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "name",
            displayName: "Name",
            type: "string",
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "elements",
            displayName: "Elements",
            type: "array",
            valueType: {
                reference: "groupElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        }
    ]
};

export const groupElement: model = {
    displayName: "Group element",
    canInfluenceOutput: true,
    creatable: true,
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
            name: "x",
            displayName: "X",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "y",
            displayName: "Y",
            type: "number",
            gettable: true,
            settable: true,
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
            name: "group",
            displayName: "Group",
            backReference: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        }
    ]
};