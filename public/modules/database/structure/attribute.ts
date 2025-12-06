import type { model } from './types';

export const attribute: model = {
    gettable: ['id', 'kind', 'value'],
    settable: ['value'],
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
            name: "kind",
            type: "string"
        },
        {
            name: "value",
            type: "string" //todo: better type
        }
    ]
};

export const preset: model = {
    gettable: ['id', 'index', 'name', 'fixtures', 'group', 'attributes'],
    settable: ['index', 'name'],
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
            name: "name",
            type: "string",
            unique: true
        },
        {
            name: "fixtures",
            type: "array",
            optional: true,
            valueType: {
                reference: "fixture"
            }
        },
        {
            name: "group",
            optional: true,
            type: {
                reference: "group"
            }
        },
        {
            name: "attributes",
            type: "array",
            valueType: {
                reference: "attribute"
            }
        }
    ]
};