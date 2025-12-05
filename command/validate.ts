import { z } from "zod";

import { structure as databaseStructure } from "../database/structure";
import { directReference as directReferenceSchema, noGetCommand as noGetCommandSchema, subReference as subReferenceSchema, value as valueSchema } from "./schema";

import type { literalPropertyType, referencePropertyType } from "../database/structure/types";
import type { property as databaseProperty, model as databaseModel } from "../database/structure/types";

export function validateSyntax(command: unknown): boolean {
    try {
        noGetCommandSchema.parse(command);
        return true;
    } catch {
        return false;
    }
}

type validateDataStructureReturn = {
    valid: true;
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

type validateDataStructureValuePath = {
    type: 'value';
    error: string;
} | {
    type: 'getCommand';
    command: validateDataStructureReturn;
} | {
    type: 'mathDualExpression';
    isFirstValue: boolean;
    error: string;
} | {
    type: 'mathDualExpression';
    value1: validateDataStructureValuePath;
} | {
    type: 'mathDualExpression';
    value2: validateDataStructureValuePath;
} | {
    type: 'mathUnaryExpression';
    error: string;
} | {
    type: 'mathUnaryExpression';
    value: validateDataStructureValuePath;
};

export function validateDataStructure(command: z.infer<typeof noGetCommandSchema>): validateDataStructureReturn {
    let sourceType: literalPropertyType | referencePropertyType | null = null;

    // source check
    if (command.operation === 'move' || command.operation === 'copy' || command.operation === 'set' || command.operation === 'open' || command.operation === 'delete' || command.operation === 'assign' || command.operation === 'go') {
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

        const foundType = result.isModel ? null : result.type;

        if (foundType === 'array') {
            return {
                valid: false,
                part: 'source',
                error: `Can't perform ${command.operation} on an array`,
                isDirectReference: null
            }
        }

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
    if (command.operation === 'empty' || command.operation === 'record' || command.operation === 'assign') {
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
    }

    // value check
    if (command.operation === 'move' || command.operation === 'copy' || command.operation === 'set') {
        let requiredValueType: literalPropertyType | referencePropertyType;

        if (command.operation === 'move' || command.operation === 'copy')
            requiredValueType = 'number' as const;
        else if (command.operation === 'set') {

            // impossible to reach, but typescript doesn't believe that
            if (sourceType === null) throw new Error('sourceType should not be null');

            requiredValueType = sourceType;
        } else
            throw new Error(`Unknown operation ${command.operation}`);

        const result = validateValueDataStructure(command.value, requiredValueType);

        if (!result.valid) {
            return {
                valid: false,
                part: 'value',
                path: result.path
            }
        }
    }

    return {
        valid: true
    };
}

export function validateReferenceDataStructure(directReference: z.infer<typeof directReferenceSchema>, subReferences: z.infer<typeof subReferenceSchema>[]): {
    valid: true;
    canMove: boolean; // checks if there is a move, and the move is settable
    canDelete: boolean;
    canGo: boolean;
    canAssign: boolean; // check if this is a thing that can be assigned to something else
    isAssignable: boolean; // check if something else can assign to this
    isSettable: boolean;
    isModel: true;
} | {
    valid: true;
    canMove: boolean; // checks if there is a move, and the move is settable
    canDelete: boolean;
    canGo: boolean;
    canAssign: boolean; // check if this is a thing that can be assigned to something else
    isAssignable: boolean; // check if something else can assign to this
    isSettable: boolean;
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

    } else {
        return {
            valid: false,
            error: 'Unknown reference type',
            isDirectReference: true
        }
    }

    let currentProperty: databaseProperty | undefined;

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
                    currentProperty = undefined;
                }
            }

            const property = currentModel.properties.find((searchProperty: databaseProperty) => searchProperty.name === subReference.key);

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

            const searchProperty = foundModel.properties.find((searchProperty: databaseProperty) => searchProperty.name === subReference.key);
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

            const result = validateValueDataStructure(subReference.value, searchProperty.type);

            if (!result.valid) {
                return {
                    valid: false,
                    isDirectReference: false,
                    subReferenceIndex: i,
                    value: result.path
                }
            }

            currentModel = foundModel;
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
    let canGo = false;
    let canAssign = false;
    let isAssignable = false;

    if (nextModel) {
        canMove = nextModel.move !== undefined && nextModel.settable.includes(nextModel.move);
        canDelete = nextModel.deletable === true;
        canGo = nextModel.goable === true;
        canAssign = nextModel.canAssign === true;
        isAssignable = nextModel.isAssignable === true;
    }

    let isSettable = false;

    if (currentProperty) {
        isSettable = currentModel.settable.includes(currentProperty.name);
    }

    if (currentProperty && typeof currentProperty.type === 'string') {
        return {
            valid: true,
            canMove,
            canDelete,
            canGo,
            canAssign,
            isAssignable,
            isSettable,
            isModel: false,
            type: currentProperty.type
        }
    } else {
        return {
            valid: true,
            canMove,
            canDelete,
            canGo,
            canAssign,
            isAssignable,
            isSettable,
            isModel: true
        }
    }
}

export function validateValueDataStructure(value: z.infer<typeof valueSchema>, requiredType: literalPropertyType | referencePropertyType): {
    valid: true;
} | {
    valid: false;
    path: validateDataStructureValuePath;
} | {

} {

}

export function validateCurrentData(command: z.infer<typeof noGetCommandSchema>): boolean {

}
