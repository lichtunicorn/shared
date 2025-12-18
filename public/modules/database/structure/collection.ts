import type { model } from './types';

export const collection: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'scenes', 'cuelists', 'executors', 'customButtons'],
    settable: ['index', 'name', 'scenes', 'cuelists', 'executors', 'customButtons'],
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
        },
        {
            name: "index",
            type: "number",
            unique: true
        },
        {
            name: "name",
            type: "string"
        },
        {
            name: "scenes",
            type: "array",
            valueType: {
                reference: "scene"
            }
        },
        {
            name: "cuelists",
            type: "array",
            valueType: {
                reference: "cuelist"
            }
        },
        {
            name: 'executors',
            type: 'array',
            valueType: {
                reference: 'executor'
            },
        },
        {
            name: 'customButtons',
            type: 'array',
            valueType: {
                reference: 'customButton'
            },
        },
    ]
};