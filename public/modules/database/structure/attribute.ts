import type { model } from './types';

export const attribute: model = {
    creatable: true,
    gettable: ['id', 'kind', 'subKind', 'value'],
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
            type: "oneOf",
            options: [
                "intensity",
                "position",
                "color",
                "beam",
                "control"
            ]
        },
        {
            name: "subKind",
            type: "string"
        },
        {
            name: "value",
            type: "stringOrNumberOrBooleanOrNull"
        }
    ]
};

export const preset: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'fixtures', 'group', 'attributes'],
    settable: ['index', 'name', 'fixtures', 'group'],
    move: 'index',
    recursiveDeleteProperties: ['attributes'],
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
            name: "name",
            type: "string"
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