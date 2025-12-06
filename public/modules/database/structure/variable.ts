import type { model } from './types';

export const variable: model = {
    gettable: ['id', 'index', 'name', 'value'],
    settable: ['index', 'name', 'value'],
    properties: [
        {
            name: "id",
            type: "string",
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