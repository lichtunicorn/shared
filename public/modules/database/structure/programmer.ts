import type { model } from "./types";

export const programmerElement: model = {
    creatable: true,
    gettable: ['id', 'index', 'fixtures', 'group', 'contents'],
    settable: ['index', 'fixtures', 'group'],
    recursiveDeleteProperties: [],
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
            name: "fixtures",
            optional: true,
            type: "array",
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
            name: "contents",
            type: "array",
            valueType: {
                reference: "programmerElementContents"
            }
        },
    ]
};

export const programmerElementContents: model = {
    creatable: true,
    gettable: ['id', 'index', 'preset', 'attributes', 'programmerElement'],
    settable: ['index', 'preset', 'attributes'],
    recursiveDeleteProperties: ['attributes'],
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
            type: 'number',
            unique: true
        },
        {
            name: "preset",
            optional: true,
            type: {
                reference: "preset"
            }
        },
        {
            name: "attributes",
            optional: true,
            type: "array",
            valueType: {
                reference: "attribute"
            }
        },
        {
            name: "programmerElement",
            backReference: true,
            type: {
                reference: "programmerElement"
            }
        }
    ]
};