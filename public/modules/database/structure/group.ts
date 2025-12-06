import type { model } from './types';

export const group: model = {
    gettable: ['id', 'index'],
    settable: ['index'],
    move: 'index',
    deletable: true,
    properties: [
        {
            name: "id",
            type: "string",
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
    gettable: ['id', 'x', 'y'],
    settable: ['x', 'y'],
    properties: [
        {
            name: "id",
            type: "string",
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