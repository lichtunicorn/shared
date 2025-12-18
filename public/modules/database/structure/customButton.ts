import type { model } from './types';

export const customButton: model = {
    creatable: true,
    gettable: ['id', 'index', 'macro', 'scene', 'cuelist'],
    settable: ['index', 'macro', 'scene', 'cuelist'],
    isAssignable: true,
    move: 'index',
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
            name: 'index',
            type: 'number',
            unique: true
        },
        {
            name: 'macro',
            type: {
                reference: 'macro'
            },
            backReference: true,
            optional: true,
        },
        {
            name: 'scene',
            type: {
                reference: 'scene'
            },
            backReference: true,
            optional: true,
        },
        {
            name: 'cuelist',
            type: {
                reference: 'cuelist'
            },
            backReference: true,
            optional: true,
        },
        {
            name: 'collection',
            type: {
                reference: 'collection'
            },
            backReference: true,
            optional: true
        }
    ]
};