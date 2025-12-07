import type { model } from './types';

export const cuelist: model = {
    gettable: ['id', 'index', 'name', 'cues'],
    settable: ['index', 'name'],
    move: 'index',
    recursiveDeleteProperties: ['cues'],
    deletable: true,
    goable: true,
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
            type: "string"
        },
        {
            name: "cues",
            type: "array",
            valueType: {
                reference: "cue"
            }
        }
    ]
};

export const cue: model = {
    gettable: ['id', 'index'],
    settable: ['index'],
    recursiveDeleteProperties: ['elements'],
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
            name: "elements",
            type: "array",
            valueType: {
                reference: "cueElement"
            },
        },
        {
            name: "cuelist",
            backReference: true,
            type: {
                reference: "cuelist"
            }
        }
    ]
};

export const cueElement: model = {
    gettable: ['id', 'index', 'fixtures', 'group', 'contents'],
    settable: ['index'],
    recursiveDeleteProperties: ['contents'],
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
                reference: "cueElementContent"
            }
        },
        {
            name: "cue",
            backReference: true,
            type: {
                reference: "cue"
            }
        }
    ]
};

export const cueElementContent: model = {
    gettable: ['id', 'index', 'preset', 'attributes'],
    settable: ['index'],
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
            name: "cueElement",
            backReference: true,
            type: {
                reference: "cueElement"
            }
        }
    ]
}