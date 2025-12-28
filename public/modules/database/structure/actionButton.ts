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

    'delete',
    'move',
    'copy',
    'open',
    'assign',
    'record',
    'go',
    'empty',

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
];

export const actionButton: model = {
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
            name: 'macro',
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
            type: 'oneOf',
            options: generalFunctionNames,
            optional: true,
            gettable: true,
            settable: true,
        }
    ]
};