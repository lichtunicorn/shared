import type { model } from './types';

export const section: model = {
    creatable: false,
    gettable: ['id', 'index', 'sceneStates', 'cuelistStates'],
    settable: [],
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
            optional: true,
            unique: true,
            comment: "null for global section"
        },
        {
            name: "sceneStates",
            type: "array",
            valueType: {
                reference: "sectionSceneState"
            },
            comment: "this is where the actual section contents/state is stored"
        },
        {
            name: "cuelistStates",
            type: "array",
            valueType: {
                reference: "sectionCuelistState"
            },
            comment: "this is where the actual section contents/state is stored",
        }
    ]
};

export const sectionSceneState: model = {
    creatable: true,
    gettable: ['id', 'scene', 'active', 'section'],
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
            name: "section",
            backReference: true,
            type: {
                reference: "section"
            }
        }
    ]
};

export const sectionCuelistState: model = {
    creatable: true,
    gettable: ['id', 'cue', 'active', 'section'],
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
            name: "section",
            backReference: true,
            type: {
                reference: "section"
            }
        }
    ]
};