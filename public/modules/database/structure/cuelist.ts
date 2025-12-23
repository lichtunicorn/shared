import type { model } from './types';

export const cuelist: model = {
    creatable: true,
    gettable: ['id', 'index', 'name', 'currentCue', 'active', 'releaseStartTime', 'activeStartTime', 'cueStartTime', 'transitionFromCue', 'intensity', 'executors', 'actionButtons', 'executorButtons', 'cues'],
    settable: ['index', 'name', 'currentCue', 'active', 'releaseStartTime', 'activeStartTime', 'cueStartTime', 'transitionFromCue', 'intensity', 'executors', 'actionButtons', 'executorButtons', 'cues'],
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
            type: "string",
            default: {
                type: "name"
            }
        },
        {
            name: 'currentCue',
            type: 'number',
            optional: true,
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
            comment: "dateTime when the cuelist started a release. Used for fading. Null if not releasing, or in crossfade"
        },
        {
            name: 'activeStartTime',
            type: 'number',
            optional: true,
            comment: "dateTime when the cuelist started to become active. Used for fading. Null if not active, or in crossfade"
        },
        {
            name: 'cueStartTime',
            type: 'number',
            optional: true,
            comment: "dateTime when the transition from one cue to another started. Used for fading. Null if not transitioning, or in crossfade (between cues)"
        },
        {
            name: 'transitionFromCue',
            type: 'number',
            optional: true,
            comment: "The cue the transition started from. Null if not transitioning between cues, or in crossfade (between cues)"
        },
        {
            name: 'intensity',
            type: 'number',
            default: {
                type: 'value',
                value: 100
            },
            comment: 'From 0 to 100'
        },
        {
            name: 'executors',
            type: 'array',
            valueType: {
                reference: 'executor'
            }
        },
        {
            name: 'actionButtons',
            type: 'array',
            valueType: {
                reference: 'actionButton'
            }
        },
        {
            name: 'executorButtons',
            type: 'array',
            valueType: {
                reference: 'executorButton'
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