import type { model } from './types';

export const scene: model = {
    gettable: ['id', 'index', 'name', 'masters', 'customButtons', 'elements'],
    settable: ['index', 'name', 'masters', 'customButtons'],
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
            name: 'masters',
            type: 'array',
            valueType: {
                reference: 'master'
            },
        },
        {
            name: 'customButtons',
            type: 'array',
            valueType: {
                reference: 'customButton'
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
    gettable: ['id', 'index', 'fixtures', 'group', 'contents', 'scene'],
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
    gettable: ['id', 'index', 'preset', 'attributes', 'sceneElement'],
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
            name: "sceneElement",
            backReference: true,
            type: {
                reference: "sceneElement"
            }
        }
    ]
}