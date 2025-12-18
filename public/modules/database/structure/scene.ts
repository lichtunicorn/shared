import type { model } from './types';

export const scene: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'active', 'executors', 'actionButtons', 'elements'],
    settable: ['index', 'name', 'active', 'executors', 'actionButtons'],
    move: 'index',
    recursiveDeleteProperties: ['elements'],
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
            },
        },
        {
            name: 'actionButtons',
            type: 'array',
            valueType: {
                reference: 'actionButton'
            },
        },
        {
            name: "elements",
            type: "array",
            valueType: {
                reference: "sceneElement"
            },
        }
    ]
};

export const sceneElement: model = {
    creatable: true,
    gettable: ['id', 'index', 'fixtures', 'group', 'contents', 'scene'],
    settable: ['index', 'fixtures', 'group'],
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
                reference: "sceneElementContent"
            }
        },
        {
            name: "scene",
            backReference: true,
            type: {
                reference: "scene"
            }
        },
    ]
};

export const sceneElementContent: model = {
    creatable: true,
    gettable: ['id', 'index', 'preset', 'attributes', 'sceneElement'],
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
            name: "sceneElement",
            backReference: true,
            type: {
                reference: "sceneElement"
            }
        }
    ]
}