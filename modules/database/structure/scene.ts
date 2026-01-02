import type { model } from './types';

export const scene: model = {
    displayName: "Scene",
    common: true,
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['elements'],
    deletable: true,
    goable: true,
    releasable: false,
    canAssign: true,
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "name",
            displayName: "Name",
            type: "string",
            default: {
                type: "name"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "priority",
            displayName: "Priority",
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
            displayName: "Active",
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
            name: 'activatedAt',
            displayName: "Activated at",
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when activated last went of 0. Used for latest takes priority.  If active goes back to 0, activatedAt stays the same."
        },
        {
            name: 'releaseStartTime',
            displayName: "Release start time",
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when the scene started a release. Used for fading. Null if not releasing, or in crossfade. Active is original value if this is used",
        },
        {
            name: 'activeStartTime',
            displayName: "Active start time",
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when the scene started to become active. Used for fading. Null if not active, or in crossfade. Active is new value if this is used"
        },
        {
            name: 'intensity',
            displayName: "Intensity",
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
            displayName: "Executors",
            type: 'array',
            valueType: {
                reference: 'executor'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: 'actionButtons',
            displayName: "Action buttons",
            type: 'array',
            valueType: {
                reference: 'actionButton'
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: "elements",
            displayName: "Elements",
            type: "array",
            valueType: {
                reference: "sceneElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true
        }
    ]
};

export const sceneElement: model = {
    displayName: "Scene element",
    canInfluenceOutput: true,
    creatable: true,
    recursiveDeleteProperties: ['contents'],
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Index",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "fixtures",
            displayName: "Fixtures",
            optional: true,
            type: "array",
            valueType: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true
        },
        {
            name: "group",
            displayName: "Group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true
        },
        {
            name: "contents",
            displayName: "Contents",
            type: "array",
            valueType: {
                reference: "sceneElementContent"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true
        },
        {
            name: "scene",
            displayName: "Scene",
            backReference: true,
            type: {
                reference: "scene"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        },
    ]
};

export const sceneElementContent: model = {
    displayName: "Scene element content",
    canInfluenceOutput: true,
    creatable: true,
    properties: [
        {
            name: "id",
            displayName: "ID",
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
            displayName: "Index",
            type: 'number',
            gettable: true,
            settable: true,
        },
        {
            name: "activeFade",
            displayName: "Active fade",
            type: 'number',
            default: {
                type: 'value',
                value: 0
            },
            gettable: true,
            settable: true,
        },
        {
            name: "releaseFade",
            displayName: "Release fade",
            type: 'number',
            default: {
                type: 'value',
                value: 0
            },
            gettable: true,
            settable: true,
        },
        {
            name: "preset",
            displayName: "Preset",
            optional: true,
            type: {
                reference: "preset"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true
        },
        {
            name: "effects",
            displayName: "Effects",
            optional: true,
            type: "array",
            valueType: {
                reference: "effect"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true
        },
        {
            name: "attributes",
            displayName: "Attributes",
            optional: true,
            type: "attributes",
            gettable: true,
            settable: true,
        },
        {
            name: "sceneElement",
            displayName: "Scene element",
            backReference: true,
            type: {
                reference: "sceneElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
}