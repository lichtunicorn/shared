import type { model } from './types';

export const effectTypes = [
    "sine",
    "step",
    "ramp",
    "invRamp",
    "linearBounce"
] as const;

export const effect: model = {
    creatable: true,
    move: 'index',
    deletable: true,
    selectable: true,
    recursiveDeleteProperties: ['nonTemplateOffsets'],
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
            settable: true,
        },
        {
            name: "type",
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
            optional: true,
            type: {
                reference: "speedGroup"
            },
            gettable: true,
            settable: true,
        },
        {
            name: "multiplier",
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
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Wings for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "xGroups",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Groups for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "xBlocks",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Blocks for this effect. If template is true, this is only for the x axis",
        },
        {
            name: "yWings",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Wings for this effect on the y axis. This is null if template is false",
        },
        {
            name: "yGroups",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Groups for this effect on the y axis. This is null if template is false",
        },
        {
            name: "yBlocks",
            type: "number",
            gettable: true,
            settable: true,
            optional: true,
            comment: "Blocks for this effect on the y axis. This is null if template is false",
        },
        {
            name: "templateOffsetXIncrease",
            type: "number",
            optional: true,
            gettable: true,
            settable: true,
            comment: "How much the offset increases per x on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetXSymmetrical",
            type: "boolean",
            optional: true,
            gettable: true,
            settable: true,
            comment: "If the offset is symmetrical on x on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetYIncrease",
            type: "number",
            optional: true,
            gettable: true,
            settable: true,
            comment: "How much the offset increases per y on selection grid. If template is false this is null"
        },
        {
            name: "templateOffsetYSymmetrical",
            type: "boolean",
            optional: true,
            gettable: true,
            settable: true,
            comment: "If the offset is symmetrical on y on selection grid. If template is false this is null"
        },
        {
            name: "nonTemplateOffsets",
            type: "array",
            valueType: {
                reference: "effectOffset"
            },
            optional: true,
            gettable: true,
            settable: true,
            comment: "The offset per fixture if template = false. Null if template = true"
        },
        {
            name: "currentValue",
            type: "oneOf",
            options: ["lowValue", "middleValue", "highValue"],
            optional: true,
            gettable: true,
            settable: true,
            comment: "Where to use the current value. If null, don't use current value"
        },
        {
            name: "lowValue",
            type: "attributes",
            optional: true,
            gettable: true,
            settable: true,
            comment: "The low value of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "lowPreset",
            type: {
                reference: "preset"
            },
            optional: true,
            gettable: true,
            settable: true,
            comment: "The low preset of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "highValue",
            type: "attributes",
            optional: true,
            gettable: true,
            settable: true,
            comment: "The high value of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
        {
            name: "highPreset",
            type: {
                reference: "preset"
            },
            optional: true,
            gettable: true,
            settable: true,
            comment: "The high preset of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
    ]
};

export const effectOffset: model = {
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
            name: "offset",
            type: "number",
            gettable: true,
            settable: true,
        },
        {
            name: "effects",
            type: {
                reference: "effect"
            },
            backReference: true,
            gettable: true,
            settable: false,
        }
    ]
};

export const speedGroup: model = {
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
            name: "bpm",
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
            type: "number",
            default: {
                type: "now"
            },
            gettable: true,
            settable: true,
        }
    ]
};