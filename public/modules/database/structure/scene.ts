import type { model } from './types';

export const scene: model = {
    gettable: ['id', 'name', 'elements'],
    settable: ['name'],
    deletable: true,
    goable: true,
    canAssign: true,
    properties: [
        {
            name: "id",
            type: "string",
            default: {
                type: "cuid"
            },
        },
        {
            name: "name",
            type: "string",
            unique: true
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
    gettable: ['id', 'index', 'fixtures', 'group', 'contents'],
    settable: ['index'],
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
    gettable: ['id', 'index', 'preset', 'attributes'],
    settable: ['index'],
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