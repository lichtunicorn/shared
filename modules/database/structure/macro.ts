import type { model } from './types';

export const macro: model = {
    displayName: "Macro",
    common: true,
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['commands'],
    deletable: true,
    goable: true,
    releasable: false,
    canAssign: true,
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
            name: "index",
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "name",
            displayName: "Name",
            type: "string",
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'actionButtons',
            displayName: "Action buttons",
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
            displayName: "Cues",
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
            displayName: "Commands",
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
    displayName: "Macro command",
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
            name: "index",
            displayName: "Index",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "macro",
            displayName: "Macro",
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
            displayName: "Contents",
            type: "string", // todo: better type
            gettable: true,
            settable: false,
            comment: 'todo: better type'
        }
    ]
};