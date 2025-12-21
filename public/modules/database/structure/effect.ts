import type { model } from './types';

export const effect: model = {
    creatable: true,
    gettable: ['id', 'index', 'type', 'speedGroup', 'multiplier', 'wings', 'groups', 'blocks'],
    settable: ['index', 'type', 'speedGroup', 'multiplier', 'wings', 'groups', 'blocks'],
    move: 'index',
    deletable: true,
    selectable: true,
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
            name: "type",
            type: "oneOf",
            default: {
                type: "value",
                value: "sine"
            },
            options: [
                "sine",
                "step",
                "ramp",
                "invRamp",
                "linearBounce"
            ]
        },
        {
            name: "speedGroup",
            optional: true,
            type: {
                reference: "speedGroup"
            }
        },
        {
            name: "multiplier",
            type: "number",
            default: {
                type: "value",
                value: 1
            }
        },
        {
            name: "wings",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "groups",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "blocks",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        }
    ]
};

export const speedGroup: model = {
    creatable: true,
    gettable: ['id', 'rate'],
    settable: ['rate'],
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
            name: "rate",
            type: "number",
            default: {
                type: "value",
                value: 60
            }
        }
    ]
};