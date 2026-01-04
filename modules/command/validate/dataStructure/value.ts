import type { z } from "zod";

import { value as valueSchema } from "../../../../modules/command/schema";
import type { literalPropertyType, referencePropertyType } from "../../../../modules/database/structure/types";
import type { validateDataStructureValuePath } from "./types";
import { validateDataStructure } from ".";

export function validateValueDataStructure(
    value: z.infer<typeof valueSchema>,
    requiredType: literalPropertyType | referencePropertyType | "array",
    optional: boolean,
    requiredValueType: referencePropertyType | null
): {
    valid: true;
    type: literalPropertyType | referencePropertyType;
} | {
    valid: true;
    type: "array";
    valueType: referencePropertyType;
} | {
    valid: false;
    path: validateDataStructureValuePath;
} {
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
            valid: true,
            type: evaluatedType === 'null' ? 'stringOrNumberOrBooleanOrNull' : evaluatedType
        };
    } else if (value.type === 'not') {
        if (requiredType !== 'boolean' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {
                return {
                    valid: false,
                    path: {
                        type: 'not',
                        error: {
                            type: 'type',
                            requiredType,
                            requiredValueType,
                            evaluatedType: 'boolean'
                        }
                    }
                }
            } else {
                return {
                    valid: false,
                    path: {
                        type: 'not',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: 'boolean'
                        }
                    }
                }
            }
        }

        const valueResult = validateValueDataStructure(value.value, 'boolean', false, null);

        if (!valueResult.valid) {
            return {
                valid: false,
                path: {
                    type: 'not',
                    value: valueResult.path
                }
            }
        }

        return {
            valid: true,
            type: 'boolean'
        };
    } else if (value.type === 'now') {
        if (requiredType !== 'number' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {
                return {
                    valid: false,
                    path: {
                        type: 'now',
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
                        type: 'now',
                        error: {
                            type: 'type',
                            requiredType,
                            evaluatedType: 'number'
                        }
                    }
                }
            }
        }

        return {
            valid: true,
            type: 'number'
        };
    } else if (value.type === 'combineArrays') {
        const value1Result = validateValueDataStructure(value.value1, 'array', false, null);

        if (!value1Result.valid) {
            return {
                valid: false,
                path: {
                    type: 'combineArrays',
                    value1: value1Result.path
                }
            }
        }

        if (value1Result.type !== 'array') {
            return {
                valid: false,
                path: {
                    type: 'combineArrays',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType: null,
                        evaluatedType: value1Result.type
                    }
                }
            }
        }

        const value2Result = validateValueDataStructure(value.value2, 'array', false, value1Result.valueType);

        if (!value2Result.valid) {
            return {
                valid: false,
                path: {
                    type: 'combineArrays',
                    value2: value2Result.path
                }
            }
        }

        if (requiredType !== 'array') {
            return {
                valid: false,
                path: {
                    type: 'combineArrays',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType: null,
                        evaluatedType: 'array',
                        evaluatedValueType: value1Result.valueType
                    }
                }
            }
        }

        if (requiredValueType !== null && requiredValueType.reference !== value1Result.valueType.reference) {
            return {
                valid: false,
                path: {
                    type: 'combineArrays',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType,
                        evaluatedType: 'array',
                        evaluatedValueType: value1Result.valueType
                    }
                }
            }
        }

        return {
            valid: true,
            type: 'array',
            valueType: value1Result.valueType
        };
    } else if (value.type === 'excludeFromArray') {
        const valueResult = validateValueDataStructure(value.value, 'array', false, null);

        if (!valueResult.valid) {
            return {
                valid: false,
                path: {
                    type: 'excludeFromArray',
                    value: valueResult.path
                }
            }
        }

        if (valueResult.type !== 'array') {
            return {
                valid: false,
                path: {
                    type: 'excludeFromArray',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType: null,
                        evaluatedType: valueResult.type
                    }
                }
            }
        }

        const excludeResult = validateValueDataStructure(value.exclude, 'array', false, valueResult.valueType);

        if (!excludeResult.valid) {
            return {
                valid: false,
                path: {
                    type: 'excludeFromArray',
                    exclude: excludeResult.path
                }
            }
        }

        if (requiredType !== 'array') {
            return {
                valid: false,
                path: {
                    type: 'excludeFromArray',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType: null,
                        evaluatedType: 'array',
                        evaluatedValueType: valueResult.valueType
                    }
                }
            }
        }

        if (requiredValueType !== null && requiredValueType.reference !== valueResult.valueType.reference) {
            return {
                valid: false,
                path: {
                    type: 'excludeFromArray',
                    error: {
                        type: 'type',
                        requiredType: 'array',
                        requiredValueType,
                        evaluatedType: 'array',
                        evaluatedValueType: valueResult.valueType
                    }
                }
            }
        }

        return {
            valid: true,
            type: 'array',
            valueType: valueResult.valueType
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

        const nonArrayResultType = result.type === 'array' ? result.valueType : result.type;
        const nonArrayRequiredType = requiredType === 'array' ? requiredValueType : requiredType;

        if (typeof nonArrayResultType !== 'string' && nonArrayResultType.reference) {
            if (nonArrayRequiredType === null) {
                return {
                    valid: true,
                    type: 'array',
                    valueType: nonArrayResultType
                };
            }

            if (typeof nonArrayRequiredType === 'string') {
                if (requiredType === 'array') {
                    if (result.type === 'array') {
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
                    } else {
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
                } else {
                    if (result.type === 'array') {
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
            }

            if (nonArrayRequiredType.reference !== nonArrayResultType.reference) {
                // todo: valid false
                return
            }

            // todo: valid true
            return;
        } else {
            if (nonArrayRequiredType === null) {
                // todo: valid false
                return;
            }

            if (typeof nonArrayRequiredType !== 'string') {
                // todo: valid false
                return;
            }

            if (nonArrayRequiredType !== nonArrayResultType) {
                // todo: valid false
                return;
            }

            // todo: valid true
            return;
        }
    } else if (value.type === 'mathDualExpression') {
        if (requiredType !== 'number' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {
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
            valid: true,
            type: 'number'
        };
    } else if (value.type === 'mathUnaryExpression') {
        if (requiredType !== 'number' && requiredType !== 'stringOrNumberOrBooleanOrNull') {
            if (requiredType === 'array') {
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
            valid: true,
            type: 'number'
        };
    } else {
        // typescript requires an else here, idk why

        // @ts-ignore
        throw new Error(`Unknown value type ${value.type}`);
    }
}