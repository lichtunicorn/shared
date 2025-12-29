import type { literalPropertyType, referencePropertyType } from "public/modules/database/structure/types";

export type validateDataStructureReturn = {
    valid: true;
} | {
    valid: true;
    type: literalPropertyType | referencePropertyType | "oneOf";
} | {
    valid: true;
    type: "array";
    valueType: referencePropertyType;
} | {
    valid: false;
    part: 'operation' | 'options';
    error: string;
} | {
    valid: false;
    part: 'source' | 'destination';
    error: string;
    isDirectReference: null;
} | {
    valid: false;
    part: 'source' | 'destination';
    error: string;
    isDirectReference: true;
} | {
    valid: false;
    part: 'source' | 'destination';
    error: string;
    isDirectReference: false;
    subReferenceIndex: number;
} | {
    valid: false;
    part: 'source' | 'destination';
    isDirectReference: false;
    subReferenceIndex: number;
    value: validateDataStructureValuePath;
} | {
    valid: false;
    part: 'value';
    path: validateDataStructureValuePath;
};

export type validateDatStructureValueError = {
    type: 'string';
    error: string;
} | (
        {
            type: 'type';
        } & (
            {
                requiredType: literalPropertyType | referencePropertyType;
            } | {
                requiredType: "array";
                requiredValueType: referencePropertyType;
            }
        ) & (
            {
                evaluatedType: literalPropertyType | referencePropertyType | "oneOf" | "null";
            } | {
                evaluatedType: "array";
                evaluatedValueType: referencePropertyType;
            }
        )
    );

export type validateDataStructureValuePath = {
    type: 'value';
    error: validateDatStructureValueError;
} | {
    type: 'getCommand';
    command: validateDataStructureReturn;
} | {
    type: 'getCommand';
    error: validateDatStructureValueError;
} | {
    type: 'mathDualExpression';
    error: validateDatStructureValueError;
} | {
    type: 'mathDualExpression';
    value1: validateDataStructureValuePath;
} | {
    type: 'mathDualExpression';
    value2: validateDataStructureValuePath;
} | {
    type: 'mathUnaryExpression';
    error: validateDatStructureValueError;
} | {
    type: 'mathUnaryExpression';
    value: validateDataStructureValuePath;
};