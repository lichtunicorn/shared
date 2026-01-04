import type { model } from './types';

export const generalFunctionNames = [
    'clear',
    'blind',
    'highlight',
    'previous',
    'all',
    'next',
    'uni',
    'nextPage',
    'previousPage',

    'section-1',
    'section-2',
    'section-3',
    'section-4',
    'section-5',

    'kindIntensity',
    'kindPosition',
    'kindColor',
    'kindBeam',

    'group',
    'scene',
    'cuelist',

    'empty',
    'copy',
    'move',
    'delete',

    'select',
    'record',
    'set',
    'setAttribute',

    'go',
    'release',
    'assign',
    'open',

    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'arrowDown',

    'number0',
    'number1',
    'number2',
    'number3',
    'number4',
    'number5',
    'number6',
    'number7',
    'number8',
    'number9',
    'dot',
    'at',
    'thru',
    'plus',
    'enter',
    'backspace',
    'set'
] as const;

export const actionButton: model = {
    displayName: "Action button",
    common: true,
    creatable: true,
    move: 'index',
    isAssignable: true,
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
            name: 'physicalButtonIndex',
            displayName: "Physical button index",
            type: 'number',
            unique: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'macro',
            displayName: "Macro",
            type: {
                reference: 'macro'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false
        },
        {
            name: 'scene',
            displayName: "Scene",
            type: {
                reference: 'scene'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'cuelist',
            displayName: "Cuelist",
            type: {
                reference: 'cuelist'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'collection',
            displayName: "Collection",
            type: {
                reference: 'collection'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'section',
            displayName: "Section",
            type: {
                reference: 'section'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'generalFunction',
            displayName: "General function",
            type: 'oneOf',
            options: [...generalFunctionNames],
            optional: true,
            gettable: true,
            settable: true,
        }
    ]
};