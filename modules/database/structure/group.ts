import type { model } from './types';

export const group: model = {
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['elements'],
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
            name: "index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "elements",
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
    canInfluenceOutput: true,
    creatable: true,
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
            name: "x",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "y",
            type: "number",
            gettable: true,
            settable: true,
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
            name: "group",
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