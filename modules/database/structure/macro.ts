import type { model } from './types';

export const macro: model = {
    creatable: true,
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
            gettable: true,
            settable: false,
        },
        {
            name: "index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: 'actionButtons',
            type: 'array',
            valueType: {
                reference: 'actionButton'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'cues',
            type: 'array',
            valueType: {
                reference: 'cue'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
            optional: true
        },
        {
            name: "commands",
            type: "array",
            valueType: {
                reference: "macroCommand"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const macroCommand: model = {
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
            name: "index",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "macro",
            backReference: true,
            type: {
                reference: "macro"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        },
        {
            name: "contents",
            type: "string", // todo: better type
            gettable: true,
            settable: false,
            comment: 'todo: better type'
        }
    ]
};