import type { model } from './types';

export const section: model = {
    creatable: false,
    gettable: ['id', 'index', 'sceneStates', 'cuelistStates', 'actionButtons', 'executorButtons'],
    settable: ['actionButtons', 'executorButtons'],
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
        },
        {
            name: "actionButtons",
            type: "array",
            valueType: {
                reference: "actionButton"
            }
        },
        {
            name: "executorButtons",
            type: "array",
            valueType: {
                reference: "executorButton"
            }
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