import type { model } from './types';

export const section: model = {
    creatable: false,
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
            gettable: true,
            settable: false,
        },
        {
            name: "index",
            type: "number",
            unique: true,
            gettable: true,
            settable: false,
        },
        {
            name: "sceneStates",
            type: "array",
            valueType: {
                reference: "sectionSceneState"
            },
            gettable: true,
            settable: false,
            comment: "this is where the actual section contents/state is stored"
        },
        {
            name: "cuelistStates",
            type: "array",
            valueType: {
                reference: "sectionCuelistState"
            },
            gettable: true,
            settable: false,
            comment: "this is where the actual section contents/state is stored",
        },
        {
            name: "actionButtons",
            type: "array",
            valueType: {
                reference: "actionButton"
            },
            gettable: true,
            settable: true,
        },
    ]
};

export const sectionSceneState: model = {
    creatable: true,
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
            name: "scene",
            type: {
                reference: "scene"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "active",
            type: "boolean",
            gettable: true,
            settable: true,
        },
        {
            name: "section",
            backReference: true,
            type: {
                reference: "section"
            },
            gettable: true,
            settable: false,
        }
    ]
};

export const sectionCuelistState: model = {
    creatable: true,
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
            name: "cue",
            type: {
                reference: "cue"
            },
            gettable: true,
            settable: false,
        },
        {
            name: "active",
            type: "boolean",
            gettable: true,
            settable: true,
        },
        {
            name: "section",
            backReference: true,
            type: {
                reference: "section"
            },
            gettable: true,
            settable: false,
        }
    ]
};