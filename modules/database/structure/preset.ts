import type { model } from './types';

export const preset: model = {
    displayName: "Preset",
    common: true,
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    selectable: true,
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
            name: "usePresetSelectionGrid",
            displayName: "Use preset selection grid",
            type: "boolean",
            gettable: true,
            settable: true,
            comment: "If true, uses the selection grid stored in the preset. If false, uses the selection grid of the model referencing the preset",
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
            name: "elements",
            displayName: "Elements",
            type: "array",
            valueType: {
                reference: "presetElement"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        }
    ]
};

export const presetElement: model = {
    displayName: "Preset element",
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    selectable: true,
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
            type: "array",
            optional: true,
            valueType: {
                reference: "fixture"
            },
            gettable: true,
            settable: true,
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
            settable: true,
            canInfluenceThisOutput: true,
        },
        {
            name: "attributes",
            displayName: "Attributes",
            type: "attributes",
            gettable: true,
            settable: true,
        }
    ]
};