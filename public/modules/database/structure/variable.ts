import type { model } from './types';

export const variable: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'value'],
    settable: ['index', 'name', 'value'],
    deletable: true,
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
            name: "name",
            type: "string",
            unique: true
        },
        {
            name: "value",
            type: "stringOrNumberOrBooleanOrNull"
        }
    ]
};