import type { model } from '../types';

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
    displayName: "Executor",
    common: true,
    creatable: false,
    isAssignable: true,
    recursiveDeleteProperties: ['executorButtons'],
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Index",
            type: 'number',
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'name',
            displayName: "Name",
            type: 'string',
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'faders',
            displayName: "Faders",
            type: {
                reference: 'executorFader'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'scene',
            displayName: "Scene",
            type: {
                reference: 'scene'
            },
            backReference: true,
            gettable: true,
            settable: true,
            optional: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'cuelist',
            displayName: "Cuelist",
            type: {
                reference: 'cuelist'
            },
            backReference: true,
            gettable: true,
            settable: true,
            optional: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'collection',
            displayName: "Collection",
            type: {
                reference: 'collection'
            },
            backReference: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
            optional: true
        },
        {
            name: 'variable',
            displayName: "Variable",
            type: {
                reference: 'variable'
            },
            backReference: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
            optional: true,
            comment: "Variable uses intensity fader function"
        },
        {
            name: 'executorButtons',
            displayName: "Executor buttons",
            type: 'array',
            valueType: {
                reference: 'executorButton'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        }
    ]
};

export const executorFader: model = {
    displayName: "Executor fader",
    creatable: true,
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Physical button index",
            type: 'number',
            unique: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'function',
            displayName: "Function",
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
    displayName: "Executor button",
    creatable: true,
    move: 'index',
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Index",
            type: 'number',
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'physicalButtonIndex',
            displayName: "Physical button index",
            type: 'number',
            unique: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'executor',
            displayName: "Executor",
            type: {
                reference: 'executor'
            },
            backReference: true,
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        },
        {
            name: 'function',
            displayName: "Function",
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