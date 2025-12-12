import type { model } from './types';

export const section: model = {
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
            optional: true, // null if global
            unique: true
        },
        {
            name: "sceneStates",
            type: "array",
            valueType: {
                reference: "sectionSceneState"
            },
        },
        {
            name: "cuelistStates",
            type: "array",
            valueType: {
                reference: "sectionCuelistState"
            },
        }
    ]
};

export const sectionSceneState: model = {
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