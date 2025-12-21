import type { model } from './types';

// todo: update gettable and settable

export const effect: model = {
    creatable: true,
    gettable: ['id', 'index', 'type', 'speedGroup', 'multiplier', 'wings', 'groups', 'blocks'],
    settable: ['index', 'type', 'speedGroup', 'multiplier', 'wings', 'groups', 'blocks'],
    move: 'index',
    deletable: true,
    selectable: true,
    recursiveDeleteProperties: ['nonTemplateOffsets', 'lowValue', 'highValue'],
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
            unique: true
        },
        {
            name: "type",
            type: "oneOf",
            default: {
                type: "value",
                value: "sine"
            },
            options: [
                "sine",
                "step",
                "ramp",
                "invRamp",
                "linearBounce"
            ]
        },
        {
            name: "speedGroup",
            optional: true,
            type: {
                reference: "speedGroup"
            }
        },
        {
            name: "multiplier",
            type: "number",
            default: {
                type: "value",
                value: 1
            }
        },
        {
            name: "wings",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "groups",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "blocks",
            type: "number",
            default: {
                type: "value",
                value: 0
            }
        },
        {
            name: "template",
            type: "boolean",
            default: {
                type: "value",
                value: true
            },
            comment: "If true, effect works for any amount of fixtures. If false, effect works for specific amount of fixtures"
        },
        {
            name: "templateOffsetBase",
            type: "number",
            optional: true,
            comment: "percentage 0 (no offset) to 50 (half offset) to 100 (full offset, so no offset). Null if template is false"
        },
        {
            name: "templateOffsetSelectionGrid",
            type: "boolean",
            optional: true,
            comment: "If true, use selection grid. If false, use fixture numbers. Null if template is false"
        },
        {
            name: "templateOffsetIncrease",
            type: "number",
            optional: true,
            comment: "How much the offset increases per fixture. Null if template is false or templateOffsetSelectionGrid is true"
        },
        {
            name: "templateOffsetXIncrease",
            type: "number",
            optional: true,
            comment: "How much the offset increases per x on selection grid. Null if template is false or templateOffsetSelectionGrid is false"
        },
        {
            name: "templateOffsetXSymmetrical",
            type: "boolean",
            optional: true,
            comment: "If the offset is symmetrical on x on selection grid. Null if template is false or templateOffsetSelectionGrid is false"
        },
        {
            name: "templateOffsetYIncrease",
            type: "number",
            optional: true,
            comment: "How much the offset increases per y on selection grid. Null if template is false or templateOffsetSelectionGrid is false"
        },
        {
            name: "templateOffsetYSymmetrical",
            type: "number",
            optional: true,
            comment: "If the offset is symmetrical on y on selection grid. Null if template is false or templateOffsetSelectionGrid is false"
        },
        {
            name: "nonTemplateOffsets",
            type: "array",
            valueType: {
                reference: "effectOffset"
            },
            optional: true,
            comment: "The offset per fixture if template = false. Null if template = true"
        },
        {
            name: "currentValue",
            type: "oneOf",
            options: ["lowValue", "middleValue", "highValue"],
            optional: true,
            comment: "Where to use the current value. If null, don't use current value"
        },
        {
            name: "lowValue",
            type: {
                reference: "attribute"
            },
            optional: true,
            comment: "The low value of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "lowPreset",
            type: {
                reference: "preset"
            },
            optional: true,
            comment: "The low preset of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null"
        },
        {
            name: "highValue",
            type: {
                reference: "attribute"
            },
            optional: true,
            comment: "The high value of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
        {
            name: "highPreset",
            type: {
                reference: "preset"
            },
            optional: true,
            comment: "The high preset of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null"
        },
    ]
};

export const effectOffset: model = {
    gettable: ['id', 'offset'],
    settable: ['offset'],
    creatable: true,
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
            name: "offset",
            type: "number"
        },
        {
            name: "effect",
            type: {
                reference: "effect"
            },
            backReference: true
        }
    ]
};

export const speedGroup: model = {
    creatable: true,
    gettable: ['id', 'rate'],
    settable: ['rate'],
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
            name: "rate",
            type: "number",
            default: {
                type: "value",
                value: 60
            }
        }
    ]
};