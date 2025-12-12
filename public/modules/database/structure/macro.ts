import type { model } from './types';

export const macro: model = {
    creatable: true,
    gettable: ['id', 'index', 'cues', 'commands', 'customButtons'],
    settable: ['index', 'cues', 'customButtons'],
    move: 'index',
    recursiveDeleteProperties: ['commands'],
    deletable: true,
    goable: true,
    canAssign: true,
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
            name: "index",
            type: "number",
            unique: true
        },
        {
            name: 'customButtons',
            type: 'array',
            valueType: {
                reference: 'customButton'
            },
        },
        {
            name: 'cues',
            type: 'array',
            valueType: {
                reference: 'cue'
            },
            optional: true
        },
        {
            name: "commands",
            type: "array",
            valueType: {
                reference: "macroCommand"
            }
        }
    ]
};

export const macroCommand: model = {
    creatable: true,
    gettable: ['id', 'index', 'macro', 'contents'],
    settable: ['index'],
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
            name: "index",
            type: "number",
            unique: true
        },
        {
            name: "macro",
            backReference: true,
            type: {
                reference: "macro"
            }
        },
        {
            name: "contents",
            type: "string", // todo: better type
            comment: 'todo: better type'
        }
    ]
};