import type { model } from './types';

export const macro: model = {
    gettable: ['id', 'index', 'commands'],
    settable: ['index'],
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
            name: "commands",
            type: "array",
            valueType: {
                reference: "macroCommand"
            }
        }
    ]
};

export const macroCommand: model = {
    gettable: ['id', 'index'],
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
        }
        //todo: add command contents
    ]
};