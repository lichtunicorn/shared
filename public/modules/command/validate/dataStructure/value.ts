import type { z } from "zod";

import { value as valueSchema } from "public/modules/command/schema";
import type { literalPropertyType, referencePropertyType } from "public/modules/database/structure/types";
import type { validateDataStructureValuePath } from "./types";
import { validateDataStructure } from ".";

export function validateValueDataStructure(
    value: z.infer<typeof valueSchema>,
    requiredType: literalPropertyType | referencePropertyType | "array",
    optional: boolean,
    requiredValueType: referencePropertyType | null
): {
    valid: true;
} | {
    valid: false;
    path: validateDataStructureValuePath;
} {
    if (requiredType === 'array' && !requiredValueType) {
        throw new Error('requiredType is array, but not requiredValueType given');
    }

    if (value.type === 'value') {
        const evaluatedType = value.value === null ? 'null' : typeof value.value;

        if (evaluatedType !== 'null' && evaluatedType !== 'string' && evaluatedType !== 'number' && evaluatedType !== 'boolean') {
            return {
                valid: false,
                path: {
                    type: 'value',
                    error: {
                        type: 'string',
                        error: 'Literal value is not a string, number, boolean or null'
                    }
                }
            }
        }

        let wrongType = false;
        if (evaluatedType === 'null') {
            wrongType = requiredType !== 'stringOrNumberOrBooleanOrNull' && !optional;
        } else {
            wrongType = requiredType !== 'stringOrNumberOrBooleanOrNull' && requiredType !== evaluatedType;
        }

        if (wrongType) {
            if (requiredType === 'array') {

                if (requiredValueType === null)
                    throw new Error('validateValueDataStructure called with requiredType=array, but requiredValueType is null');

                return {
                    valid: false,
                    path: {
                        type: 'value',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType
                        }
                    }
                }
            } else {
                return {
                    valid: false,
                    path: {
                        type: 'value',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType
                        }
                    }
                }
            }
        }

        return {
            valid: true
        };
    } else if (value.type === 'getCommand') {
        if (value.command.operation !== 'get') {
            return {
                valid: false,
                path: {
                    type: 'getCommand',
                    error: {
                        type: 'string',
                        error: 'getCommand value used, but command is not a get command'
                    }
                }
            }
        }

        const result = validateDataStructure(value.command, true);

        if (!result.valid) {
            return {
                valid: false,
                path: {
                    type: 'getCommand',
                    command: result
                }
            }
        }

        if (!('type' in result))
            throw new Error('validateDataStructure called with get command, but no type is returned');

        if (typeof result.type !== 'string' && result.type.reference) {

            if (!(typeof requiredType !== 'string' && requiredType.reference)) {
                if (requiredType === 'array') {

                    if (requiredValueType === null)
                        throw new Error('validateValueDataStructure called with requiredType=array, but requiredValueType is null');

                    return {
                        valid: false,
                        path: {
                            type: 'getCommand',
                            error: {
                                type: 'type',
                                requiredType,
                                requiredValueType,
                                evaluatedType: result.type
                            }
                        }
                    }
                } else {
                    return {
                        valid: false,
                        path: {
                            type: 'getCommand',
                            error: {
                                type: 'type',
                                requiredType,
                                evaluatedType: result.type
                            }
                        }
                    }
                }
            }

            if (requiredType.reference !== result.type.reference) {
                return {
                    valid: false,
                    path: {
                        type: 'getCommand',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: result.type
                        }
                    }
                }
            }

        } else if (result.type === 'array' || requiredType === 'array') {
            if (result.type !== 'array' && requiredType === 'array') {

                if (requiredValueType === null)
                    throw new Error('validateValueDataStructure called with requiredType=array, but requiredValueType is null');

                return {
                    valid: false,
                    path: {
                        type: 'getCommand',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType: result.type
                        }
                    }
                }
            }

            if (requiredType !== 'array' && result.type === 'array') {
                return {
                    valid: false,
                    path: {
                        type: 'getCommand',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: result.type,
                            evaluatedValueType: result.valueType
                        }
                    }
                }
            }

            if (result.type !== 'array') throw new Error('result.type is not array');
            if (!result.valueType) throw new Error('result.valueType is null');
            if (requiredType !== 'array') throw new Error('requiredType is not array');

            if (requiredValueType === null) throw new Error('requiredValueType is null');

            if (result.valueType.reference !== requiredValueType.reference) {
                return {
                    valid: false,
                    path: {
                        type: 'getCommand',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType: result.type,
                            evaluatedValueType: result.valueType
                        }
                    }
                }
            }
        } else {

            const checkingResultType = result.type === 'oneOf' ? 'string' : result.type;

            if (requiredType !== 'stringOrNumberOrBooleanOrNull' && result.type !== 'stringOrNumberOrBooleanOrNull' && requiredType !== checkingResultType) {
                return {
                    valid: false,
                    path: {
                        type: 'getCommand',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: result.type
                        }
                    }
                }
            }

        }

        return {
            valid: true
        };

    } else if (value.type === 'mathDualExpression') {
        if (requiredType !== 'number' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {

                if (requiredValueType === null)
                    throw new Error('validateValueDataStructure called with requiredType=array, but requiredValueType is null');

                return {
                    valid: false,
                    path: {
                        type: 'mathDualExpression',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType: 'number'
                        }
                    }
                }
            } else {
                return {
                    valid: false,
                    path: {
                        type: 'mathDualExpression',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: 'number'
                        }
                    }
                }
            }
        }

        const value1result = validateValueDataStructure(value.value1, 'number', false, null);

        if (!value1result.valid) {
            return {
                valid: false,
                path: {
                    type: 'mathDualExpression',
                    value1: value1result.path
                }
            }
        }

        const value2result = validateValueDataStructure(value.value2, 'number', false, null);

        if (!value2result.valid) {
            return {
                valid: false,
                path: {
                    type: 'mathDualExpression',
                    value2: value2result.path
                }
            }
        }

        return {
            valid: true
        };
    } else if (value.type === 'mathUnaryExpression') {
        if (requiredType !== 'number' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {

                if (requiredValueType === null)
                    throw new Error('validateValueDataStructure called with requiredType=array, but requiredValueType is null');

                return {
                    valid: false,
                    path: {
                        type: 'mathUnaryExpression',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType: 'number'
                        }
                    }
                }
            } else {
                return {
                    valid: false,
                    path: {
                        type: 'mathUnaryExpression',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: 'number'
                        }
                    }
                }
            }
        }

        const valueResult = validateValueDataStructure(value.value, 'number', false, null);

        if (!valueResult.valid) {
            return {
                valid: false,
                path: {
                    type: 'mathUnaryExpression',
                    value: valueResult.path
                }
            }
        }

        return {
            valid: true
        };
    } else {
        // typescript requires an else here, idk why

        // @ts-ignore
        throw new Error(`Unknown value type ${value.type}`);
    }
}