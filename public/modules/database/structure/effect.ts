import type { model } from './types';

export const effect: model = {
    gettable: ['id', 'index', 'type', 'speedGroup', 'rate'],
    settable: ['index', 'type', 'speedGroup', 'rate'],
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
            name: "rate",
            type: "number",
            default: {
                type: "value",
                value: 60
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