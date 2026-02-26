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
    'activeFade',
    'cueCrossfade'
] as const;

export const executor: model = {
    displayName: "Executor",
    creatable: false,
    isAssignable: true,
    recursiveDeleteProperties: ['buttons', 'faders'],
    recursiveCopyProperties: ['buttons', 'faders'],
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
            name: 'name',
            displayName: "Name",
            type: 'string',
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
            copyable: true,
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
            copyable: true,
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
            copyable: true,
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
            copyable: true,
            canInfluenceThisOutput: false,
            optional: true
        },
        {
            name: 'faders',
            displayName: "Faders",
            type: 'array',
            valueType: {
                reference: 'executorFader'
            },
            gettable: true,
            settable: true,
            copyable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'buttons',
            displayName: "Buttons",
            type: 'array',
            valueType: {
                reference: 'executorButton'
            },
            gettable: true,
            settable: true,
            copyable: true,
            canInfluenceThisOutput: false,
        }
    ]
};

export const executorFader: model = {
    displayName: "Executor fader",
    copyUniqueContextProperties: ['executor'],
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
            copyable: true,
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
            copyable: true,
            canInfluenceThisOutput: false,
        }
    ]
}

export const executorButton: model = {
    displayName: "Executor button",
    creatable: true,
    copyUniqueContextProperties: ['executor'],
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
            name: 'executor',
            displayName: "Executor",
            type: {
                reference: 'executor'
            },
            backReference: true,
            gettable: true,
            settable: false,
            copyable: true,
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
            copyable: true,
        }
    ]
};