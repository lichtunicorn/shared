import type { model } from './types';

export const cuelist: model = {
    displayName: "Cuelist",
    common: true,
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    recursiveDeleteProperties: ['cues'],
    deletable: true,
    goable: true,
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
            name: 'currentCue',
            displayName: "Current cue",
            type: 'number',
            optional: true,
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
            name: 'cueCrossfade',
            displayName: "Cue crossfade",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "From 0 to 100. 0 if at transitionFromCue. 100 if at currentCue. Null if not transitioning between cues"
        },
        {
            name: 'activatedAt',
            displayName: "Activated at",
            type: 'number',
            optional: true,
            gettable: true,
            settable: false,
            comment: "dateTime when activated last went of 0. Used for latest takes priority. If active goes back to 0, activatedAt stays the same."
        },
        {
            name: 'releaseStartTime',
            displayName: "Release start time",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "dateTime when the cuelist started a release. Used for fading. Null if not releasing, or in crossfade. Active is original value if this is used"
        },
        {
            name: 'activeStartTime',
            displayName: "Active start time",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "dateTime when the cuelist started to become active. Used for fading. Null if not active, or in crossfade. Active is new value if this is used"
        },
        {
            name: 'cueStartTime',
            displayName: "Cue start time",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "dateTime when the transition from one cue to another started. Used for fading. Null if not transitioning, or in crossfade (between cues)"
        },
        {
            name: 'transitionFromCue',
            displayName: "Transition from cue",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
            comment: "The cue the transition started from. Null if not transitioning between cues"
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
            comment: 'From 0 to 100'
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
            name: "cues",
            displayName: "Cues",
            type: "array",
            valueType: {
                reference: "cue"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        }
    ]
};

export const cue: model = {
    displayName: "Cue",
    canInfluenceOutput: true,
    creatable: true,
    deletable: true,
    goable: true,
    recursiveDeleteProperties: ['elements'],
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
            name: "cueFade",
            displayName: "Cue fade",
            type: 'number',
            default: {
                type: 'value',
                value: 0
            },
            gettable: true,
            settable: true,
        },
        {
            name: 'macro',
            displayName: "Macro",
            type: {
                reference: 'macro'
            },
            backReference: true,
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: "elements",
            displayName: "Elements",
            type: "array",
            valueType: {
                reference: "cueElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "cuelist",
            displayName: "Cuelist",
            backReference: true,
            type: {
                reference: "cuelist"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const cueElement: model = {
    displayName: "Cue element",
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
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "group",
            displayName: "Group",
            optional: true,
            type: {
                reference: "group"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "contents",
            displayName: "Contents",
            type: "array",
            valueType: {
                reference: "cueElementContent"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: true,
        },
        {
            name: "cue",
            displayName: "Cue",
            backReference: true,
            type: {
                reference: "cue"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const cueElementContent: model = {
    displayName: "Cue element content",
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
            settable: false,
            canInfluenceThisOutput: true,
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
            settable: false,
            canInfluenceThisOutput: true,
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
            name: "cueElement",
            displayName: "Cue element",
            backReference: true,
            type: {
                reference: "cueElement"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
}