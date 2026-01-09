import type { model } from '../types';

export const section: model = {
    displayName: "Section",
    creatable: false,
    recursiveDeleteProperties: ['sceneStates', 'cuelistStates'],
    goable: true,
    releasable: false,
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
            settable: false,
        },
        {
            name: "sceneStates",
            displayName: "Scene states",
            type: "array",
            valueType: {
                reference: "sectionSceneState"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
            comment: "this is where the actual section contents/state is stored"
        },
        {
            name: "cuelistStates",
            displayName: "Cuelist states",
            type: "array",
            valueType: {
                reference: "sectionCuelistState"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
            comment: "this is where the actual section contents/state is stored",
        },
        {
            name: "actionButtons",
            displayName: "Action buttons",
            type: "array",
            valueType: {
                reference: "actionButton"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
    ]
};

export const sectionSceneState: model = {
    displayName: "Section scene state",
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
            name: "scene",
            displayName: "Scene",
            type: {
                reference: "scene"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        },
        {
            name: "active",
            displayName: "Active",
            type: "boolean",
            gettable: true,
            settable: true,
        },
        {
            name: "section",
            displayName: "Section",
            backReference: true,
            type: {
                reference: "section"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const sectionCuelistState: model = {
    displayName: "Section cuelist state",
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
            name: "cuelist",
            displayName: "Cuelist",
            type: {
                reference: "cuelist"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        },
        {
            name: "currentCue",
            displayName: "Current cue",
            type: 'number',
            optional: true,
            gettable: true,
            settable: true,
        },
        {
            name: "active",
            displayName: "Active",
            type: "boolean",
            gettable: true,
            settable: true,
        },
        {
            name: "section",
            displayName: "Section",
            backReference: true,
            type: {
                reference: "section"
            },
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};