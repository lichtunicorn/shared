import type { model } from './types';

// first one is the default
export const executorButtonFunctionNames = [
    'flashFull',
    'flashZero',
    'flashActive',
    'go',
    'goBack',
    'release'
] as const;

// first one is the default
export const faderFunctionNames = [
    'intensity',
    'activeCrossfade',
    'cueCrossfade'
] as const;

export const executor: model = {
    creatable: false,
    gettable: ['id', 'index', 'scene', 'cuelist', 'collection', 'executorButtons', 'faders'],
    settable: ['scene', 'cuelist', 'collection', 'executorButtons', 'faders'],
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
            name: 'faders',
            type: {
                reference: 'executorFader'
            },
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

export const executorFader: model = {
    creatable: true,
    gettable: ['id', 'physicalButtonIndex', 'function'],
    settable: ['physicalButtonIndex', 'function'],
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
            name: 'physicalButtonIndex',
            type: 'number',
            unique: true,
            optional: true
        },
        {
            name: 'function',
            type: 'oneOf',
            options: faderFunctionNames as unknown as string[],
            default: {
                type: 'value',
                value: faderFunctionNames[0]
            }
        }
    ]
}

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
            options: executorButtonFunctionNames as unknown as string[],
            default: {
                type: 'value',
                value: executorButtonFunctionNames[0]
            }
        }
    ]
};