import type { model } from './types';

export const collection: model = {
    creatable: true,
    move: 'index',
    deletable: true,
    goable: true,
    canAssign: true,
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
            name: "name",
            type: "string",
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "scenes",
            type: "array",
            valueType: {
                reference: "scene"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "cuelists",
            type: "array",
            valueType: {
                reference: "cuelist"
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'executors',
            type: 'array',
            valueType: {
                reference: 'executor'
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'actionButtons',
            type: 'array',
            valueType: {
                reference: 'actionButton'
            },
            gettable: true,
            settable: true,
        },
    ]
};