import type { model } from '../types';

import { kinds } from '../../../../kinds';

export const effectTypes = [
    "sine",
    "step",
    "ramp",
    "invRamp",
    "linearBounce"
] as const;

export const effect: model = {
    displayName: "Effect",
    canInfluenceOutput: true,
    creatable: true,
    move: 'index',
    deletable: true,
    selectable: true,
    recursiveDeleteProperties: ['elements'],
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
            name: "index",
            displayName: "Index",
            type: "number",
            unique: true,
            gettable: true,
            settable: true,
        },
        {
            name: "elements",
            displayName: "Elements",
            type: "array",
            valueType: {
                reference: "effectElement"
            },
            canInfluenceThisOutput: true,
            gettable: true,
            settable: true
        }
    ]
}

export const effectElement: model = {
    displayName: "Effect element",
    canInfluenceOutput: true,
    creatable: true,
    deletable: true,
    recursiveDeleteProperties: ['nonTemplateOffsets'],
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
            name: "effect",
            displayName: "Effect",
            type: {
                reference: "effect"
            },
            backReference: true,
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false
        },
        {
            name: "kinds",
            displayName: "Kinds",
            type: "array",
            valueType: {
                reference: "effectKind"
            },
            gettable: true,
            canInfluenceThisOutput: true,
            settable: true
        },
        {
            name: "type",
            displayName: "Type",
            type: "oneOf",
            default: {
                type: "value",
                value: "sine"
            },
            options: [...effectTypes],
            gettable: true,
            settable: true,
        },
        {
            name: "speedGroup",
            displayName: "Speed group",
            type: {
                reference: "speedGroup"
            },
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
        },
        {
            name: "multiplier",
            displayName: "Multiplier",
            type: "number",
            default: {
                type: "value",
                value: 1
            },
            gettable: true,
            settable: true,
        },
        {
            name: "template",
            displayName: "Template",
            type: "boolean",
            default: {
                type: "value",
                value: true
            },
            gettable: true,
            settable: true,
            comment: "If true, effect works for any amount of fixtures. If false, effect works for specific amount of fixtures"
        },
        {
            name: "templateOffsetBase",
            displayName: "Template offset base",
            type: "number",
            default: {
                type: "value",
                value: 0
            },
            optional: true,
            gettable: true,
            settable: true,
            comment: "percentage 0 (no offset) to 50 (half offset) to 100 (full offset, so no offset). Null if template is false"
        },
        {
            name: "xWings",
            displayName: "X wings",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Wings for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "xGroups",
            displayName: "X groups",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Groups for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "xBlocks",
            displayName: "X blocks",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Blocks for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "yWings",
            displayName: "Y wings",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Wings for this effect on the y axis. This is null if template is false",
        },
        {
            name: "yGroups",
            displayName: "Y groups",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Groups for this effect on the y axis. This is null if template is false",
        },
        {
            name: "yBlocks",
            displayName: "Y blocks",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Blocks for this effect on the y axis. This is null if template is false",
        },
        {
            name: "templateOffsetXIncrease",
            displayName: "Template offset X increase",
            type: "number",
            optional: true,
            gettable: true,
            settable: true,
            comment: "How much the offset increases per x on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetXSymmetrical",
            displayName: "Template offset X symmetrical",
            type: "boolean",
            optional: true,
            gettable: true,
            settable: true,
            comment: "If the offset is symmetrical on x on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetYIncrease",
            displayName: "Template offset Y increase",
            type: "number",
            optional: true,
            gettable: true,
            settable: true,
            comment: "How much the offset increases per y on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetYSymmetrical",
            displayName: "Template offset Y symmetrical",
            type: "boolean",
            optional: true,
            gettable: true,
            settable: true,
            comment: "If the offset is symmetrical on y on selection grid. If template is false this is null"
        },
        {
            name: "nonTemplateOffsets",
            displayName: "Non template offsets",
            type: "array",
            valueType: {
                reference: "effectOffset"
            },
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
            comment: "The offset per fixture if template = false. Null if template = true"
        },
        {
            name: "currentValue",
            displayName: "Current value",
            type: "oneOf",
            options: ["lowValue", "middleValue", "highValue"],
            optional: true,
            gettable: true,
            settable: true,
            comment: "Where to use the current value. If null, don't use current value"
        },
        {
            name: "lowValue",
            displayName: "Low value",
            type: "attributes",
            optional: true,
            gettable: true,
            settable: true,
            comment: "The low value of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "lowPreset",
            displayName: "Low preset",
            type: {
                reference: "preset"
            },
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
            comment: "The low preset of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "highValue",
            displayName: "High value",
            type: "attributes",
            optional: true,
            gettable: true,
            settable: true,
            comment: "The high value of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
        {
            name: "highPreset",
            displayName: "High preset",
            type: {
                reference: "preset"
            },
            optional: true,
            gettable: true,
            settable: true,
            canInfluenceThisOutput: true,
            comment: "The high preset of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
    ]
};

export const effectKind: model = {
    displayName: "Effect kind",
    canInfluenceOutput: true,
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
            name: "kind",
            displayName: "Kind",
            type: "oneOf",
            options: [...kinds],
            gettable: true,
            settable: true,
        },
        {
            name: "subKind",
            displayName: "Sub kind",
            type: "string",
            gettable: true,
            settable: true,
        },
        {
            name: "effectElement",
            displayName: "Effect element",
            type: {
                reference: "effectElement"
            },
            backReference: true,
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const effectOffset: model = {
    displayName: "Effect offset",
    canInfluenceOutput: true,
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
            name: "offset",
            displayName: "Offset",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "effectElement",
            displayName: "Effect element",
            type: {
                reference: "effectElement"
            },
            backReference: true,
            gettable: true,
            settable: false,
            canInfluenceThisOutput: false,
        }
    ]
};

export const speedGroup: model = {
    displayName: "Speed group",
    canInfluenceOutput: true,
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
            name: "bpm",
            displayName: "BPM",
            type: "number",
            default: {
                type: "value",
                value: 60
            },
            gettable: true,
            settable: true,
        },
        {
            name: "firstHitTime",
            displayName: "First hit time",
            type: "number",
            default: {
                type: "now"
            },
            gettable: true,
            settable: true,
        }
    ]
};