import type { model } from './types';

export const sequence: model = {
    creatable: false,
    gettable: ['id', 'index', 'sceneStates', 'cuelistStates', 'customButtons'],
    settable: ['customButtons'],
    recursiveDeleteProperties: ['sceneStates', 'cuelistStates'],
    goable: true,
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
            unique: true,
        },
        {
            name: "sceneStates",
            type: "array",
            valueType: {
                reference: "sequenceSceneState"
            },
            comment: "this is where the actual sequence contents/state is stored"
        },
        {
            name: "cuelistStates",
            type: "array",
            valueType: {
                reference: "sequenceCuelistState"
            },
            comment: "this is where the actual sequence contents/state is stored",
        },
        {
            name: "customButtons",
            type: "array",
            valueType: {
                reference: "customButton"
            }
        }
    ]
};

export const sequenceSceneState: model = {
    creatable: true,
    gettable: ['id', 'scene', 'active', 'sequence'],
    settable: ['active'],
    properties: [
        {
            name: "id",
            type: "string",
            unique: true,
            default: {
                type: "cuid"
            }
        },
        {
            name: "scene",
            type: {
                reference: "scene"
            }
        },
        {
            name: "active",
            type: "boolean"
        },
        {
            name: "sequence",
            backReference: true,
            type: {
                reference: "sequence"
            }
        }
    ]
};

export const sequenceCuelistState: model = {
    creatable: true,
    gettable: ['id', 'cue', 'active', 'sequence'],
    settable: ['active'],
    properties: [
        {
            name: "id",
            type: "string",
            unique: true,
            default: {
                type: "cuid"
            }
        },
        {
            name: "cue",
            type: {
                reference: "cue"
            }
        },
        {
            name: "active",
            type: "boolean"
        },
        {
            name: "sequence",
            backReference: true,
            type: {
                reference: "sequence"
            }
        }
    ]
};