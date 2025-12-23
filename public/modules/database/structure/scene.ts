import type { model } from './types';

export const scene: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'active', 'releaseStartTime', 'activeStartTime', 'intensity', 'executors', 'actionButtons', 'executorButtons', 'elements'],
    settable: ['index', 'name', 'active', 'intensity', 'executors', 'actionButtons', 'executorButtons'],
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
            type: 'number',
            default: {
                type: 'value',
                value: 0
            },
            comment: "0 if not active. 100 if active. In between if active is crossfading. Active property is only 100 or 0 when automatically fading, releaseStartTime and activeStartTime are used for the in between values."
        },
        {
            name: 'releaseStartTime',
            type: 'number',
            optional: true,
            comment: "dateTime when the scene started a release. Used for fading. Null if not releasing, or in crossfade"
        },
        {
            name: 'activeStartTime',
            type: 'number',
            optional: true,
            comment: "dateTime when the scene started to become active. Used for fading. Null if not active, or in crossfade"
        },
        {
            name: 'intensity',
            type: 'number',
            default: {
                type: 'value',
                value: 100
            },
            comment: "From 0 to 100"
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
            name: 'executorButtons',
            type: 'array',
            valueType: {
                reference: 'executorButton'
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