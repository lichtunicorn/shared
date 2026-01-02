import type { z } from "zod";
import type { literalPropertyType, referencePropertyType } from "../../../../modules/database/structure/types";
import type { validateDataStructureReturn } from "./types";

import { noGetCommand as noGetCommandSchema, getCommand as getCommandSchema, getOperation } from "../../../../modules/command/schema";
import { validateReferenceDataStructure } from "./reference";
import { validateValueDataStructure } from "./value";
import { kinds } from "../../../../kinds";
import { operations } from "../../../../modules/command/schema";

export function validateDataStructure(command: z.infer<typeof noGetCommandSchema | typeof getCommandSchema>, canBeGetCommand: boolean = false): validateDataStructureReturn {
    if (command.operation === 'get' && !canBeGetCommand) {
        return {
            valid: false,
            part: 'operation',
            error: 'get command is not allowed'
        }
    }

    const foundOperation =
        command.operation === 'get' ?
            getOperation :
            operations.find(operation => operation.name === command.operation);

    if (!foundOperation) {
        return {
            valid: false,
            part: 'operation',
            error: 'Unknown operation'
        }
    }

    let sourceType: literalPropertyType | referencePropertyType | "oneOf" | "array" | null = null;
    let sourceValueType: referencePropertyType | null = null;
    let sourceOptional: boolean | null = null;

    // source check
    if (
        command.operation === 'copy' ||
        command.operation === 'move' ||
        command.operation === 'delete' ||

        command.operation === 'select' ||
        command.operation === 'set' ||
        command.operation === 'setAttribute' ||

        command.operation === 'go' ||
        command.operation === 'release' ||
        command.operation === 'assign' ||
        command.operation === 'open'
    ) {
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

        sourceType = result.type;
        sourceOptional = result.isOptional;

        if (result.type === 'array') {
            sourceValueType = result.valueType;
        }

        if (foundOperation.requiresSourceModel && !result.isModel) {
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

        if (command.operation === 'release' && !result.canRelease) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is release, but this source can\'t be released',
                isDirectReference: null
            }
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

        if (command.operation === 'select' && !result.canSelect) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is select, but this source can\'t be selected',
                isDirectReference: null
            }
        }

        if (command.operation === 'setAttribute' && !result.canSetAttribute) {
            return {
                valid: false,
                part: 'source',
                error: 'Command operation is setAttribute, but setAttribute can\'t be performed on this source',
                isDirectReference: null
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
                error: `Can't perform ${command.operation} on a ${result.type}`,
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
    if (command.operation === 'move' || command.operation === 'set' || command.operation === 'setAttribute') {
        let requiredValueType: literalPropertyType | referencePropertyType | "array";
        let requiredValueValueType: referencePropertyType | null = null;
        let requiredOptional: boolean;

        if (command.operation === 'move') {
            requiredValueType = 'number';
            requiredOptional = false;
        } else if (command.operation === 'set') {

            // impossible to reach, but typescript doesn't believe that
            if (sourceType === null) throw new Error('sourceType should not be null');
            if (sourceOptional === null) throw new Error('sourceOptional should not be null');

            if (sourceType === 'array') {
                if (sourceValueType === null) throw new Error('sourceValueType should not be null');

                requiredValueType = 'array';
                requiredValueValueType = sourceValueType;
            } else if (sourceType === 'oneOf') {
                requiredValueType = 'string';
            } else {
                requiredValueType = sourceType;
            }

            requiredOptional = sourceOptional;
        } else if (command.operation === 'setAttribute') {
            requiredValueType = 'stringOrNumberOrBooleanOrNull';
            requiredOptional = true;
        } else
            throw new Error(`Unknown operation ${(command as any).operation}`);

        const result = validateValueDataStructure(command.value, requiredValueType, requiredOptional, requiredValueValueType);

        if (!result.valid) {
            return {
                valid: false,
                part: 'value',
                path: result.path
            }
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
    } else if (command.operation === 'setAttribute') {
        if (!kinds.includes(command.options.kind)) {
            return {
                valid: false,
                part: 'options',
                error: `Unknown kind. Must be one of ${kinds.join(' ')}`
            };
        };

        if (!command.options.subKind) {
            return {
                valid: false,
                part: 'options',
                error: 'No subKind provided'
            };
        };
    }

    if (command.operation === 'get') {
        if (sourceType === null)
            throw new Error('Get command, but sourceType is null');

        if (sourceType === 'array') {
            if (sourceValueType === null)
                throw new Error('sourceType is array, but sourceValueType is null');

            return {
                valid: true,
                type: sourceType,
                valueType: sourceValueType
            }
        } else {
            return {
                valid: true,
                type: sourceType
            }
        }
    } else {
        return {
            valid: true
        };
    }
}