import type { model } from './types';

export const executorButtonFunctionNames = [
    'flashFull',
    'flashZero',
    'flashActive',
    'go',
    'goBack',
    'release'
];

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
    gettable: ['id', 'index', 'physicalButtonIndex', 'executor', 'function'],
    settable: ['index', 'physicalButtonIndex', 'function'],
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
            name: 'physicalButtonIndex',
            type: 'number',
            unique: true,
            optional: true
        },
        {
            name: 'executor',
            type: {
                reference: 'executor'
            },
            backReference: true
        },
        {
            name: 'function',
            type: 'oneOf',
            options: executorButtonFunctionNames
        }
    ]
};