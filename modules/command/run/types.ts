import type { literalPropertyType, referencePropertyType } from "../../database/structure/types";

export type commandRunSource = 'commandLine';

export type runCommandReturn = {
    valid: true;
} | {
    valid: false;
    error: string;
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
    value: evaluateValuePath;
} | {
    valid: false;
    part: 'value';
    path: evaluateValuePath;
};

export type evaluateValueError = {
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
                requiredValueType: referencePropertyType | null;
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

export type evaluateValuePath = {
    type: null;
    error: evaluateValueError;
} | {
    type: 'value';
    error: evaluateValueError;
} | {
    type: 'not';
    error: evaluateValueError;
} | {
    type: 'now';
    error: evaluateValueError;
} | {
    type: 'not';
    value: evaluateValuePath;
} | {
    type: 'combineArrays';
    error: evaluateValueError;
} | {
    type: 'combineArrays';
    value1: evaluateValuePath;
} | {
    type: 'combineArrays';
    value2: evaluateValuePath;
} | {
    type: 'excludeFromArray';
    error: evaluateValueError;
} | {
    type: 'excludeFromArray';
    value: evaluateValuePath;
} | {
    type: 'excludeFromArray';
    exclude: evaluateValuePath;
} | {
    type: 'getCommand';
    command: runCommandReturn;
} | {
    type: 'getCommand';
    error: evaluateValueError;
} | {
    type: 'mathDualExpression';
    error: evaluateValueError;
} | {
    type: 'mathDualExpression';
    value1: evaluateValuePath;
} | {
    type: 'mathDualExpression';
    value2: evaluateValuePath;
} | {
    type: 'mathUnaryExpression';
    error: evaluateValueError;
} | {
    type: 'mathUnaryExpression';
    value: evaluateValuePath;
};