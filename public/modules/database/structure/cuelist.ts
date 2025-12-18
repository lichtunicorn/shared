import type { model } from './types';

export const cuelist: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'currentCue', 'active', 'executors', 'customButtons', 'cues'],
    settable: ['index', 'name', 'currentCue', 'active', 'executors', 'customButtons', 'cues'],
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
            name: 'currentCue',
            type: 'number',
            optional: true,
        },
        {
            name: 'active',
            type: 'boolean',
            default: {
                type: 'value',
                value: false
            }
        },
        {
            name: 'executors',
            type: 'array',
            valueType: {
                reference: 'executor'
            }
        },
        {
            name: 'customButtons',
            type: 'array',
            valueType: {
                reference: 'customButton'
            }
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
    creatable: true,
    gettable: ['id', 'index', 'macro', 'elements', 'cuelist'],
    settable: ['index', 'macro'],
    deletable: true,
    goable: true,
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
            name: 'macro',
            type: {
                reference: 'macro'
            },
            backReference: true,
            optional: true,
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
    creatable: true,
    gettable: ['id', 'index', 'fixtures', 'group', 'contents', 'cue'],
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
    creatable: true,
    gettable: ['id', 'index', 'preset', 'attributes', 'cueElement'],
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