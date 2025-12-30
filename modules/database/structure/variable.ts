import type { model } from './types';

export const variable: model = {
    displayName: "Variable",
    common: true,
    creatable: true,
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
            name: "name",
            type: "string",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "value",
            type: "stringOrNumberOrBooleanOrNull",
            gettable: true,
            settable: true,
        },
        {
            name: "executors",
            type: "array",
            valueType: {
                reference: "executor"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        }
    ]
};