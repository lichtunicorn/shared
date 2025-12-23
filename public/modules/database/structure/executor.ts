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
            gettable: true,
            settable: false,
        },
        {
            name: 'index',
            type: 'number',
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'faders',
            type: {
                reference: 'executorFader'
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'scene',
            type: {
                reference: 'scene'
            },
            backReference: true,
            gettable: true,
            settable: true,
            optional: true,
        },
        {
            name: 'cuelist',
            type: {
                reference: 'cuelist'
            },
            backReference: true,
            gettable: true,
            settable: true,
            optional: true,
        },
        {
            name: 'collection',
            type: {
                reference: 'collection'
            },
            backReference: true,
            gettable: true,
            settable: true,
            optional: true
        },
        {
            name: 'executorButtons',
            type: 'array',
            valueType: {
                reference: 'executorButton'
            },
            gettable: true,
            settable: true,
        }
    ]
};

export const executorFader: model = {
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
            name: 'physicalButtonIndex',
            type: 'number',
            unique: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'function',
            type: 'oneOf',
            options: [...faderFunctionNames],
            default: {
                type: 'value',
                value: faderFunctionNames[0]
            },
            gettable: true,
            settable: true,
        }
    ]
}

export const executorButton: model = {
    creatable: true,
    move: 'index',
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
            name: 'index',
            type: 'number',
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'physicalButtonIndex',
            type: 'number',
            unique: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'executor',
            type: {
                reference: 'executor'
            },
            backReference: true,
            gettable: true,
            settable: false,
        },
        {
            name: 'function',
            type: 'oneOf',
            options: [...executorButtonFunctionNames],
            default: {
                type: 'value',
                value: executorButtonFunctionNames[0]
            },
            gettable: true,
            settable: true,
        }
    ]
};