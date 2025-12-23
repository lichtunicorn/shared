import type { model } from './types';

export const cuelist: model = {
    creatable: true,
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
            default: {
                type: "name"
            },
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
            name: 'currentCue',
            type: 'number',
            optional: true,
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
            settable: true,
            comment: "dateTime when the cuelist started a release. Used for fading. Null if not releasing, or in crossfade"
        },
        {
            name: 'activeStartTime',
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "dateTime when the cuelist started to become active. Used for fading. Null if not active, or in crossfade"
        },
        {
            name: 'cueStartTime',
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "dateTime when the transition from one cue to another started. Used for fading. Null if not transitioning, or in crossfade (between cues)"
        },
        {
            name: 'transitionFromCue',
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "The cue the transition started from. Null if not transitioning between cues, or in crossfade (between cues)"
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
            comment: 'From 0 to 100'
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
            name: "cues",
            type: "array",
            valueType: {
                reference: "cue"
            },
            gettable: true,
            settable: true,
        }
    ]
};

export const cue: model = {
    creatable: true,
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
            gettable: true,
            settable: false,
        },
        {
            name: "index",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: 'macro',
            type: {
                reference: 'macro'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: "elements",
            type: "array",
            valueType: {
                reference: "cueElement"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "cuelist",
            backReference: true,
            type: {
                reference: "cuelist"
            },
            gettable: true,
            settable: false,
        }
    ]
};

export const cueElement: model = {
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
            settable: false,
        },
        {
            name: "group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "contents",
            type: "array",
            valueType: {
                reference: "cueElementContent"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "cue",
            backReference: true,
            type: {
                reference: "cue"
            },
            gettable: true,
            settable: false,
        }
    ]
};

export const cueElementContent: model = {
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
            settable: false,
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
            name: "cueElement",
            backReference: true,
            type: {
                reference: "cueElement"
            },
            gettable: true,
            settable: false,
        }
    ]
}