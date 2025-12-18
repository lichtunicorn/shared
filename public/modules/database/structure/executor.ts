import type { model } from './types';
import { actionButton } from './actionButton';

export const executor: model = {
    creatable: false,
    gettable: ['id', 'index', 'scene', 'cuelist', 'collection', 'executorButtons'],
    settable: ['scene', 'cuelist', 'collection', 'executorButtons'],
    isAssignable: true,
    recursiveDeleteProperties: ['executorButtons'],
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
        },
        {
            name: 'executorButtons',
            type: 'array',
            valueType: {
                reference: 'executorButton'
            }
        }
    ]
};

export const executorButton: model = {
    creatable: true,
    gettable: [...actionButton.gettable],
    settable: [...actionButton.settable],
    properties: [
        ...actionButton.properties,
        {
            name: 'executor',
            type: {
                reference: 'executor'
            },
            backReference: true
        }
    ]
};