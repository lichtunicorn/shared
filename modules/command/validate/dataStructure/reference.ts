import type { z } from "zod";
import type { literalPropertyType, referencePropertyType, property as databaseProperty, model as databaseModel } from "../../../../modules/database/structure/types";
import type { validateDataStructureValuePath } from "./types";

import { directReference as directReferenceSchema, subReference as subReferenceSchema } from "../../../../modules/command/schema";
import { structure as databaseStructure } from "../../../../modules/database/structure";
import { validateValueDataStructure } from "./value";

export function validateReferenceDataStructure(directReference: z.infer<typeof directReferenceSchema>, subReferences: z.infer<typeof subReferenceSchema>[]): {
    valid: true;
    /** checks if there is a move, and the move is settable */
    canMove: boolean;
    canDelete: boolean;
    canCreate: boolean;
    canGo: boolean;
    canSelect: boolean;
    canSetAttribute: boolean;
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
    canSelect: boolean;
    canSetAttribute: boolean;
    /** check if this is a thing that can be assigned to something else */
    canAssign: boolean;
    /** check if something else can assign to this */
    isAssignable: boolean;
    isSettable: boolean;
    isOptional: boolean;
    isModel: true;
    type: "array";
    valueType: referencePropertyType;
} | {
    valid: true;
    /** checks if there is a move, and the move is settable */
    canMove: boolean;
    canDelete: boolean;
    canCreate: boolean;
    canGo: boolean;
    canSelect: boolean;
    canSetAttribute: boolean;
    /** check if this is a thing that can be assigned to something else */
    canAssign: boolean;
    /** check if something else can assign to this */
    isAssignable: boolean;
    isSettable: boolean;
    isOptional: boolean;
    isModel: false;
    type: literalPropertyType | "oneOf";
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
    let isDirectArray = false;

    if (directReference.type === 'reference' || directReference.type === 'references') {
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

        if (directReference.type === 'references') {
            isDirectArray = true;
        }
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

            if (isDirectArray) {
                return {
                    valid: false,
                    error: 'Key used on a direct array',
                    isDirectReference: false,
                    subReferenceIndex: i
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

            if (property.gettable !== true) {
                return {
                    valid: false,
                    error: 'Property is not gettable',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }

            currentProperty = property;

        } else if (subReference.type === 'getUniqueFromArray' || subReference.type === 'filter') {
            let foundModel;
            let foundModelName;

            if (isDirectArray) {
                foundModel = currentModel;
                foundModelName = currentModelName;
            } else {

                if (currentProperty === undefined || currentProperty.type !== 'array') {
                    return {
                        valid: false,
                        error: `${subReference.type} used on a non array`,
                        isDirectReference: false,
                        subReferenceIndex: i
                    }
                }

                foundModel = databaseStructure[currentProperty.valueType.reference];
                foundModelName = currentProperty.valueType.reference;

                if (!foundModel) throw new Error(`Database reference to ${currentProperty.valueType.reference} not found`);

            }

            const searchProperty = foundModel.properties.find((searchProperty: databaseProperty<string>) => searchProperty.name === subReference.key);
            if (!searchProperty) {
                return {
                    valid: false,
                    error: 'Unknown key',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (searchProperty.gettable !== true) {
                return {
                    valid: false,
                    error: 'Key is not gettable',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (typeof searchProperty.type !== 'string' && searchProperty.type.reference !== undefined) {
                return {
                    valid: false,
                    error: 'Can\'t use a reference as key',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (searchProperty.type === 'array') {
                return {
                    valid: false,
                    error: 'Can\'t use an array as key',
                    isDirectReference: false,
                    subReferenceIndex: i
                }
            }
            if (subReference.type === 'getUniqueFromArray') {
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
            }

            // @ts-ignore checked above it can't be a reference type
            const searchPropertyType: Exclude<typeof searchProperty.type, referencePropertyType> = searchProperty.type;

            const result = validateValueDataStructure(
                subReference.value,
                searchPropertyType === "oneOf" ? "string" : searchPropertyType,
                searchProperty.optional === true,
                null
            );

            if (!result.valid) {
                return {
                    valid: false,
                    isDirectReference: false,
                    subReferenceIndex: i,
                    value: result.path
                }
            }

            if (subReference.type === 'getUniqueFromArray') {
                currentModel = foundModel;
                currentModelName = foundModelName;
                currentProperty = undefined;
                isDirectArray = false;
            } else {
                // filter
                // nothing changes
            }

        } else if (subReference.type === 'every') {
            let foundModel;
            let foundModelName;

            if (isDirectArray) {
                foundModel = currentModel;
                foundModelName = currentModelName;
            } else {

                if (currentProperty === undefined || currentProperty.type !== 'array') {
                    return {
                        valid: false,
                        error: 'every used on a non array',
                        isDirectReference: false,
                        subReferenceIndex: i
                    }
                }

                foundModel = databaseStructure[currentProperty.valueType.reference];
                foundModelName = currentProperty.valueType.reference;

                if (!foundModel) throw new Error(`Database reference to ${currentProperty.valueType.reference} not found`);

            }

            currentModel = foundModel;
            currentModelName = foundModelName;
            currentProperty = undefined;
            isDirectArray = false;
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
    let canSelect = false;
    let canSetAttribute = false;
    let canAssign = false;
    let isAssignable = false;

    if (nextModel) {
        canMove = nextModel.move !== undefined;
        canDelete = nextModel.deletable === true;
        canCreate = nextModel.creatable === true;
        canGo = nextModel.goable === true;
        canSelect = nextModel.selectable === true;
        canAssign = nextModel.canAssign === true;
        isAssignable = nextModel.isAssignable === true;

        if (nextModel.properties.some(property => property.type === 'attributes' && property.settable === true)) {
            canSetAttribute = true;
        }
    } else {
        canMove = currentModel.move !== undefined;
        canDelete = currentModel.deletable === true;
        canCreate = currentModel.creatable === true;
        canGo = currentModel.goable === true;
        canSelect = currentModel.selectable === true;
        canAssign = currentModel.canAssign === true;
        isAssignable = currentModel.isAssignable === true;

        if (currentModel.properties.some(property => property.type === 'attributes' && property.settable === true)) {
            canSetAttribute = true;
        }
    }

    let isSettable = false;

    if (currentProperty) {
        isSettable = currentProperty.settable === true && currentProperty.type !== 'attributes';
    }

    let isOptional = false;

    if (currentProperty) {
        isOptional = currentProperty.optional === true;
    }

    if (currentProperty && currentProperty.type === 'array') {
        return {
            valid: true,
            canMove,
            canDelete,
            canCreate,
            canGo,
            canSelect,
            canSetAttribute,
            canAssign,
            isAssignable,
            isSettable,
            isOptional,
            isModel: true,
            type: currentProperty.type,
            valueType: currentProperty.valueType
        }
    } else if (isDirectArray) {
        return {
            valid: true,
            canMove,
            canDelete,
            canCreate,
            canGo,
            canSelect,
            canSetAttribute,
            canAssign,
            isAssignable,
            isSettable,
            isOptional,
            isModel: true,
            type: 'array',
            valueType: {
                reference: currentModelName
            }
        }
    } else if (currentProperty && typeof currentProperty.type === 'string') {
        return {
            valid: true,
            canMove,
            canDelete,
            canCreate,
            canGo,
            canSelect,
            canSetAttribute,
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
            canSelect,
            canSetAttribute,
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