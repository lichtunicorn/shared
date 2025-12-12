import type { model } from './types';

export const effect: model = {
    creatable: true,
    gettable: ['id', 'index', 'type', 'speedGroup', 'multiplier'],
    settable: ['index', 'type', 'speedGroup', 'multiplier'],
    move: 'index',
    deletable: true,
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
        }
    ]
};

export const speedGroup: model = {
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