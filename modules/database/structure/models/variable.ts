import type { model } from '../types';

export const variable: model = {
    displayName: "Variable",
    common: true,
    creatable: true,
    deletable: true,
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
            unique: true,
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "value",
            displayName: "Value",
            type: "stringOrNumberOrBooleanOrNull",
            gettable: true,
            settable: true,
        },
        {
            name: "executors",
            displayName: "Executors",
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