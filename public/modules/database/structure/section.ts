import type { model } from './types';

export const section: model = {
    gettable: ['id', 'index', 'global', 'sceneStates', 'cuelistStates'],
    settable: ['index'],
    goable: true,
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
            name: "global",
            type: "boolean"
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
    gettable: ['id', 'scene', 'active'],
    settable: ['active'],
    properties: [
        {
            name: "id",
            type: "string",
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
            parent: "section",
            type: {
                reference: "section"
            }
        }
    ]
};

export const sectionCuelistState: model = {
    gettable: ['id', 'cue', 'active'],
    settable: ['active'],
    properties: [
        {
            name: "id",
            type: "string",
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
            parent: "section",
            type: {
                reference: "section"
            }
        }
    ]
};