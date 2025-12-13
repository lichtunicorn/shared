import { z } from "zod";

import { structure as databaseStructure } from "../../database/structure";
import { directReference as directReferenceSchema, noGetCommand as noGetCommandSchema, getCommand as getCommandSchema, subReference as subReferenceSchema, value as valueSchema } from "../schema";

import type { literalPropertyType, referencePropertyType } from "../../database/structure/types";
import type { property as databaseProperty, model as databaseModel } from "../../database/structure/types";

type validateDataStructureReturn = {
    valid: true;
} | {
    valid: true;
    type: literalPropertyType | referencePropertyType | "oneOf";
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

type validateDatStructureValueError = {
    type: 'string';
    error: string;
} | {
    type: 'type';

    requiredType: literalPropertyType | referencePropertyType;
    evaluatedType: literalPropertyType | referencePropertyType | "oneOf";
};

type validateDataStructureValuePath = {
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

export function validateDataStructure(command: z.infer<typeof noGetCommandSchema | typeof getCommandSchema>, canBeGetCommand: boolean = false): validateDataStructureReturn {
    if (command.operation === 'get' && !canBeGetCommand) {
        return {
            valid: false,
            part: 'operation',
            error: 'get command is not allowed'
        }
    }

    let sourceType: literalPropertyType | referencePropertyType | "oneOf" | null = null;
    let sourceOptional: boolean | null = null;

    // source check
    if (command.operation === 'move' || command.operation === 'copy' || command.operation === 'set' || command.operation === 'open' || command.operation === 'delete' || command.operation === 'assign' || command.operation === 'go' || command.operation === 'get') {
        const result = validateReferenceDataStructure(command.source, command.subSources);

        if (!result.valid) {
            if (result.isDirectReference) {
                return {
                    valid: false,
                    part: 'source',
                    error: result.error,
                    isDirectReference: result.isDirectReference,
                }
            } else if ('value' in result) {
                return {
                    valid: false,
                    part: 'source',
                    isDirectReference: result.isDirectReference,
                    subReferenceIndex: result.subReferenceIndex,
                    value: result.value
                }
            } else {
                return {
                    valid: false,
                    part: 'source',
                    error: result.error,
                    isDirectReference: result.isDirectReference,
                    subReferenceIndex: result.subReferenceIndex
                }
            }
        }

        if (result.type === 'array') {
            return {
                valid: false,
                part: 'source',
                error: `Can't perform ${command.operation} on an array`,
                isDirectReference: null
            }
        }

        sourceType = result.type;
        sourceOptional = result.isOptional;

        if (['move', 'copy', 'open', 'delete', 'assign', 'go'].includes(command.operation) && !result.isModel) {
            return {
                valid: false,
                part: 'source',
                error: `Can't perform ${command.operation} on an ${result.type}`,
                isDirectReference: null
            }
        }

        if (command.operation === 'move' && !result.canMove) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is move, but this source can\'t be moved',
                isDirectReference: null
            };
        }

        if (command.operation === 'delete' && !result.canDelete) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is delete, but this source can\'t be deleted',
                isDirectReference: null
            };
        }

        if (command.operation === 'go' && !result.canGo) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is go, but this source can\'t be goed',
                isDirectReference: null
            };
        }

        if (command.operation === 'assign' && !result.canAssign) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is assign, but this source can\'t be assigned to something else',
                isDirectReference: null
            };
        }

        if (command.operation === 'set' && !result.isSettable) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is set, but this source can\'t be set',
                isDirectReference: null
            };
        }
    }

    // options check
    if (command.operation === 'open') {
        if (!command.options.all) {
            if (command.options.clients.length === 0) {
                return {
                    valid: false,
                    part: 'options',
                    error: 'Command operation is open, but no clients are specified',
                };
            }
        }
    }

    // destination check
    if (command.operation === 'empty' || command.operation === 'record' || command.operation === 'assign' || command.operation === 'copy') {
        const result = validateReferenceDataStructure(command.destination, command.subDestinations);

        if (!result.valid) {
            if (result.isDirectReference) {
                return {
                    valid: false,
                    part: 'destination',
                    error: result.error,
                    isDirectReference: result.isDirectReference,
                }
            } else if ('value' in result) {
                return {
                    valid: false,
                    part: 'destination',
                    isDirectReference: result.isDirectReference,
                    subReferenceIndex: result.subReferenceIndex,
                    value: result.value
                }
            } else {
                return {
                    valid: false,
                    part: 'destination',
                    error: result.error,
                    isDirectReference: result.isDirectReference,
                    subReferenceIndex: result.subReferenceIndex
                }
            }
        }

        if (!result.isModel) {
            return {
                valid: false,
                part: 'destination',
                error: `Can't ${command.operation} to a ${result.type}`,
                isDirectReference: null
            }
        }

        if (command.operation === 'assign' && !result.isAssignable) {
            return {
                valid: false,
                part: 'destination',
                error: 'Command operation is assign, but nothing can be assigned to this destination can\'t',
                isDirectReference: null
            };
        }

        if (command.operation === 'empty' && !result.canCreate) {
            return {
                valid: false,
                part: 'destination',
                error: 'Command operation is empty, but this destination can\'t be created',
                isDirectReference: null
            };
        }
    }

    // value check
    if (command.operation === 'move' || command.operation === 'set' || command.operation === 'go') {
        let requiredValueType: literalPropertyType | referencePropertyType;
        let requiredOptional: boolean;

        if (command.operation === 'go') {
            requiredValueType = 'number';
            requiredOptional = true;
        } else if (command.operation === 'move') {
            requiredValueType = 'number' as const;
            requiredOptional = false;
        } else if (command.operation === 'set') {

            // impossible to reach, but typescript doesn't believe that
            if (sourceType === null) throw new Error('sourceType should not be null');
            if (sourceOptional === null) throw new Error('sourceOptional should not be null');

            if (sourceType === 'oneOf')
                requiredValueType = 'string';
            else
                requiredValueType = sourceType;

            requiredOptional = sourceOptional;
        } else
            throw new Error(`Unknown operation ${(command as any).operation}`);

        const result = validateValueDataStructure(command.value, requiredValueType, requiredOptional);

        if (!result.valid) {
            return {
                valid: false,
                part: 'value',
                path: result.path
            }
        }
    }

    if (command.operation === 'get') {
        if (sourceType === null)
            throw new Error('Get command, but sourceType is null');

        return {
            valid: true,
            type: sourceType
        }
    } else {
        return {
            valid: true
        };
    }
}

export function validateReferenceDataStructure(directReference: z.infer<typeof directReferenceSchema>, subReferences: z.infer<typeof subReferenceSchema>[]): {
    valid: true;
    /** checks if there is a move, and the move is settable */
    canMove: boolean;
    canDelete: boolean;
    canCreate: boolean;
    canGo: boolean;
    /** check if this is a thing that can be assigned to something else */
    canAssign: boolean;
    /** check if something else can assign to this */
    isAssignable: boolean;
    isSettable: boolean;
    isOptional: boolean;
    isModel: true;
    type: referencePropertyType;
} | {
    valid: true;
    /** checks if there is a move, and the move is settable */
    canMove: boolean;
    canDelete: boolean;
    canCreate: boolean;
    canGo: boolean;
    /** check if this is a thing that can be assigned to something else */
    canAssign: boolean;
    /** check if something else can assign to this */
    isAssignable: boolean;
    isSettable: boolean;
    isOptional: boolean;
    isModel: false;
    type: literalPropertyType | "array" | "oneOf";
} | {
    valid: false;
    error: string;
    isDirectReference: true;
} | {
    valid: false;
    error: string;
    isDirectReference: false;
    subReferenceIndex: number;
} | {
    valid: false;
    isDirectReference: false;
    subReferenceIndex: number;
    value: validateDataStructureValuePath;
} {
    let currentModel: databaseModel;
    let currentModelName: string;

    if (directReference.type === 'reference') {
        const foundModel = databaseStructure[directReference.reference];

        if (!foundModel) {
            return {
                valid: false,
                error: 'Unknown reference model name',
                isDirectReference: true
            }
        }

        currentModel = foundModel;
        currentModelName = directReference.reference;
    } else if (directReference.type === 'context') {
        let modelName;

        if ([
            'show',
            'section',
            'scene',
            'cuelist',
            'cue',
            'speedGroup',
            'variable',
            'collection',
            'fixture'
        ].includes(directReference.context))
            modelName = directReference.context;
        else if (directReference.context === 'executingMacro' || directReference.context === 'calledMacro') {
            modelName = 'macro';
        } else if (directReference.context === 'executingMacroCommand') {
            modelName = 'macroCommand';
        } else {
            return {
                valid: false,
                error: 'Unknown reference context',
                isDirectReference: true
            }
        }

        const foundModel = databaseStructure[modelName];

        if (!foundModel) {
            throw new Error(`Expected model ${modelName} to exist`);
        }

        currentModel = foundModel;
        currentModelName = modelName;

    } else {
        return {
            valid: false,
            error: 'Unknown reference type',
            isDirectReference: true
        }
    }

    let currentProperty: databaseProperty<string> | undefined;

    for (let iString in subReferences) {
        const i = parseInt(iString);
        const isLast = i === subReferences.length - 1;
        const subReference = subReferences[i];

        if (!subReference) throw new Error('Expected subReference to exist'); // never happens, but typescript is dumb

        if (subReference.type === 'key') {
            if (currentProperty !== undefined) {
                if (typeof currentProperty.type !== 'string' && currentProperty.type.reference !== undefined) {
                    const foundModel = databaseStructure[currentProperty.type.reference];

                    if (!foundModel) throw new Error(`Database reference to ${currentProperty.type.reference} not found`);

                    currentModel = foundModel;
                    currentModelName = currentProperty.type.reference;
                    currentProperty = undefined;
                }
            }

            const property = currentModel.properties.find((searchProperty: databaseProperty<string>) => searchProperty.name === subReference.key);

            if (!property) {
                return {
                    valid: false,
                    error: 'Unknown key',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }

            if (!currentModel.gettable.includes(property.name)) {
                return {
                    valid: false,
                    error: 'Property is not gettable',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }

            currentProperty = property;

        } else if (subReference.type === 'getUniqueFromArray') {
            if (currentProperty === undefined || currentProperty.type !== 'array') {
                return {
                    valid: false,
                    error: 'Get unique from array used on a non array',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }

            const foundModel = databaseStructure[currentProperty.valueType.reference];

            if (!foundModel) throw new Error(`Database reference to ${currentProperty.valueType.reference} not found`);

            const searchProperty = foundModel.properties.find((searchProperty: databaseProperty<string>) => searchProperty.name === subReference.key);
            if (!searchProperty) {
                return {
                    valid: false,
                    error: 'Unknown search key',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (!foundModel.gettable.includes(subReference.key)) {
                return {
                    valid: false,
                    error: 'Search key is not gettable',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (typeof searchProperty.type !== 'string' && searchProperty.type.reference !== undefined) {
                return {
                    valid: false,
                    error: 'Can\'t search a reference',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (searchProperty.type === 'array') {
                return {
                    valid: false,
                    error: 'Can\'t search an array',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (searchProperty.type === 'oneOf') {
                return {
                    valid: false,
                    error: 'Can\'t search an oneOf property',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (searchProperty.unique !== true) {
                return {
                    valid: false,
                    error: 'Search key is not unique',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }

            // @ts-ignore checked above it can't be a reference type
            const searchPropertyType: Exclude<typeof searchProperty.type, referencePropertyType> = searchProperty.type;

            const result = validateValueDataStructure(subReference.value, searchPropertyType, false);

            if (!result.valid) {
                return {
                    valid: false,
                    isDirectReference: false,
                    subReferenceIndex: i,
                    value: result.path
                }
            }

            currentModel = foundModel;
            currentModelName = currentProperty.valueType.reference;
            currentProperty = undefined;

        } else {
            return {
                valid: false,
                error: 'Unknown subReference type',
                isDirectReference: false,
                subReferenceIndex: i
            }
        }
    }

    let nextModel: databaseModel | undefined;

    if (currentProperty !== undefined && typeof currentProperty.type !== 'string' && currentProperty.type.reference !== undefined) {
        const foundModel = databaseStructure[currentProperty.type.reference];

        if (!foundModel) throw new Error(`Database reference to ${currentProperty.type.reference} not found`);

        nextModel = foundModel;
    }

    let canMove = false;
    let canDelete = false;
    let canCreate = false;
    let canGo = false;
    let canAssign = false;
    let isAssignable = false;

    if (nextModel) {
        canMove = nextModel.move !== undefined && nextModel.settable.includes(nextModel.move);
        canDelete = nextModel.deletable === true;
        canCreate = nextModel.creatable === true;
        canGo = nextModel.goable === true;
        canAssign = nextModel.canAssign === true;
        isAssignable = nextModel.isAssignable === true;
    }

    let isSettable = false;

    if (currentProperty) {
        isSettable = currentModel.settable.includes(currentProperty.name);
    }

    let isOptional = false;

    if (currentProperty) {
        isOptional = currentProperty.optional === true;
    }

    if (currentProperty && typeof currentProperty.type === 'string') {
        return {
            valid: true,
            canMove,
            canDelete,
            canCreate,
            canGo,
            canAssign,
            isAssignable,
            isSettable,
            isOptional,
            isModel: false,
            type: currentProperty.type
        }
    } else {
        return {
            valid: true,
            canMove,
            canDelete,
            canCreate,
            canGo,
            canAssign,
            isAssignable,
            isSettable,
            isOptional,
            isModel: true,
            type: {
                reference: currentProperty ? currentProperty.type.reference : currentModelName
            }
        }
    }
}

export function validateValueDataStructure(value: z.infer<typeof valueSchema>, requiredType: literalPropertyType | referencePropertyType, optional: boolean): {
    valid: true;
} | {
    valid: false;
    path: validateDataStructureValuePath;
} {
    if (value.type === 'value') {
        if (!['string', 'number', 'boolean'].includes(typeof value.value)) {
            return {
                valid: false,
                path: {
                    type: 'value',
                    error: {
                        type: 'string',
                        error: 'Literal value is not a string, number or boolean'
                    }
                }
            }
        }

        // @ts-ignore see above it can only be string number or boolean
        const evaluatedType: "string" | "number" | "boolean" = typeof value.value;

        if (requiredType !== 'stringOrNumberOrBooleanOrNull' && requiredType !== evaluatedType) {
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

        const value1result = validateValueDataStructure(value.value1, 'number', false);

        if (!value1result.valid) {
            return {
                valid: false,
                path: {
                    type: 'mathDualExpression',
                    value1: value1result.path
                }
            }
        }

        const value2result = validateValueDataStructure(value.value2, 'number', false);

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

        const valueResult = validateValueDataStructure(value.value, 'number', false);

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