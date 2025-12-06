import type { model } from './types';

export const collection: model = {
    gettable: ['id', 'index', 'name', 'scenes', 'cuelists'],
    settable: ['index', 'name'],
    move: 'index',
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
            name: "name",
            type: "string",
            unique: true
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
        }
    ]
};