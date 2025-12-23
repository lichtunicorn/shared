import type { model } from './types';

export const scene: model = {
    creatable: true,
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
            gettable: true,
            settable: false,
        },
        {
            name: "index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "name",
            type: "string",
            gettable: true,
            settable: true,
        },
        {
            name: "priority",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'active',
            type: 'number',
            default: {
                type: 'value',
                value: 0
            },
            gettable: true,
            settable: true,
            comment: "0 if not active. 100 if active. In between if active is crossfading. Active property is only 100 or 0 when automatically fading, releaseStartTime and activeStartTime are used for the in between values."
        },
        {
            name: 'releaseStartTime',
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when the scene started a release. Used for fading. Null if not releasing, or in crossfade",
        },
        {
            name: 'activeStartTime',
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when the scene started to become active. Used for fading. Null if not active, or in crossfade"
        },
        {
            name: 'intensity',
            type: 'number',
            default: {
                type: 'value',
                value: 100
            },
            gettable: true,
            settable: true,
            comment: "From 0 to 100"
        },
        {
            name: 'executors',
            type: 'array',
            valueType: {
                reference: 'executor'
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'actionButtons',
            type: 'array',
            valueType: {
                reference: 'actionButton'
            },
            gettable: true,
            settable: true,
        },
        {
            name: "elements",
            type: "array",
            valueType: {
                reference: "sceneElement"
            },
            gettable: true,
            settable: false,
        }
    ]
};

export const sceneElement: model = {
    canSetAttribute: true,
    creatable: true,
    recursiveDeleteProperties: ['contents'],
    properties: [
        {
            name: "id",
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
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "fixtures",
            optional: true,
            type: "array",
            valueType: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "contents",
            type: "array",
            valueType: {
                reference: "sceneElementContent"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "scene",
            backReference: true,
            type: {
                reference: "scene"
            },
            gettable: true,
            settable: false,
        },
    ]
};

export const sceneElementContent: model = {
    canSetAttribute: true,
    creatable: true,
    recursiveDeleteProperties: ['attributes'],
    properties: [
        {
            name: "id",
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
            type: 'number',
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "preset",
            optional: true,
            type: {
                reference: "preset"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "attributes",
            optional: true,
            type: "array",
            valueType: {
                reference: "attribute"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "sceneElement",
            backReference: true,
            type: {
                reference: "sceneElement"
            },
            gettable: true,
            settable: false,
        }
    ]
}