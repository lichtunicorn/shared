import type { model } from '../types';

export const collection: model = {
    displayName: "Collection",
    creatable: true,
    move: 'index',
    deletable: true,
    goable: true,
    releasable: true,
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
            name: "scenes",
            displayName: "Scenes",
            type: "array",
            valueType: {
                reference: "scene"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
        },
        {
            name: "cuelists",
            displayName: "Cuelists",
            type: "array",
            valueType: {
                reference: "cuelist"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: false,
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
    ]
};