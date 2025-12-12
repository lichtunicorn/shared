import type { model } from './types';

export const group: model = {
    creatable: true,
    gettable: ['id', 'index', 'elements'],
    settable: ['index'],
    move: 'index',
    recursiveDeleteProperties: ['elements'],
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
            name: "index",
            type: "number",
            unique: true
        },
        {
            name: "elements",
            type: "array",
            valueType: {
                reference: "groupElement"
            },
        }
    ]
};

export const groupElement: model = {
    creatable: true,
    gettable: ['id', 'x', 'y', 'group'],
    settable: ['x', 'y'],
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
            name: "x",
            type: "number"
        },
        {
            name: "y",
            type: "number"
        },
        {
            name: "group",
            backReference: true,
            type: {
                reference: "group"
            }
        }
    ]
};