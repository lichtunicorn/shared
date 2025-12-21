import type { model } from './types';

export const generalFunctionNames = [
    'clear',
    'blind',
    'highlight',
    'previous',
    'all',
    'next',
    'uni',

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
    gettable: ['id', 'index', 'macro', 'scene', 'cuelist', 'collection', 'section', 'generalFunction', 'physicalButtonIndex'],
    settable: ['index', 'macro', 'scene', 'cuelist', 'collection', 'section', 'generalFunction', 'physicalButtonIndex'],
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
            name: 'physicalButtonIndex',
            type: 'number',
            unique: true,
            optional: true
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
        },
        {
            name: 'section',
            type: {
                reference: 'section'
            },
            backReference: true,
            optional: true
        },
        {
            name: 'generalFunction',
            type: 'oneOf',
            options: generalFunctionNames,
            optional: true,
        }
    ]
};