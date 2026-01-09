import type { modelName, structure as structureType } from "./types";

import { show } from "./models/show";
import { section, sectionSceneState, sectionCuelistState } from "./models/section";
import { group, groupElement } from "./models/group";
import { scene, sceneElement, sceneElementContent } from "./models/scene";
import { cuelist, cue, cueElement, cueElementContent } from "./models/cuelist";
import { effect, effectElement, speedGroup, effectKind, effectOffset } from "./models/effect";
import { override } from "./models/override";
import { variable } from "./models/variable";
import { macro, macroCommand } from "./models/macro";
import { collection } from "./models/collection";
import { fixture } from "./models/fixture";
import { preset, presetElement } from "./models/preset";
import { executor, executorButton, executorFader } from "./models/executor";
import { actionButton } from "./models/actionButton";
import { programmerElement, programmerElementContent } from "./models/programmer";

export const modelsLayout: modelName[][] = [
    [
        'executor',
        'actionButton',
        'macro',
        'variable',
        'speedGroup',
    ],
    [
        'scene',
        'cuelist',
        'collection',
        'section',
    ],
    [
        'fixture',
        'group',
        'preset',
        'effect',
    ]
];

export const structure: structureType = {

    executor,
    actionButton,
    macro,
    variable,
    speedGroup,

    scene,
    cuelist,
    collection,
    section,

    fixture,
    group,
    preset,
    effect,

    show,
    cue,
    override,
    sectionSceneState,
    sectionCuelistState,
    groupElement,
    sceneElement,
    sceneElementContent,
    cueElement,
    cueElementContent,
    effectElement,
    effectOffset,
    effectKind,
    macroCommand,
    presetElement,
    executorButton,
    executorFader,
    programmerElement,
    programmerElementContent
};

checkDatabaseStructure();
function checkDatabaseStructure() {
    const modelNames = Object.keys(structure);

    for (const [modelName, model] of Object.entries(structure)) {

        if (model.move) {
            const property = model.properties.find(property => property.name === model.move);

            if (!property) {
                throw new Error(`Model ${modelName} has invalid move property ${model.move}`);
            }

            if (property.settable !== true) {
                throw new Error(`Model ${modelName} has move property ${model.move}, but that property is not settable`);
            }

            if (property.type !== 'string' && property.type !== 'number' && property.type !== 'boolean') {
                throw new Error(`Model ${modelName} has move property ${model.move}, but that property is not a string, number or boolean`);
            }
        }

        if (!model.properties.find(a => a.name === 'id')) {
            throw new Error(`Model ${modelName} has no id property`);
        }

        if (model.recursiveDeleteProperties) {
            for (const propertyName of model.recursiveDeleteProperties) {
                const property = model.properties.find(a => a.name === propertyName);

                if (!property)
                    throw new Error(`Model ${modelName} has invalid recursiveDeleteProperty ${propertyName}`);

                if (property.type !== 'array' && !(typeof property.type !== 'string' && property.type.reference)) {
                    throw new Error(`Model ${modelName} has recursiveDeleteProperty ${propertyName}, but that property is not a reference`);
                }
            }
        }

        for (const property of model.properties) {
            if (!property.name) {
                throw new Error(`Model ${modelName} has property with invalid name`);
            }

            if (!property.displayName) {
                throw new Error(`Model ${modelName} has property ${property.name} with invalid displayName`);
            }

            if (property.name === 'id') {
                if (property.displayName !== 'ID') {
                    throw new Error(`Model ${modelName} has id property, but displayName is not 'ID'`);
                }

                if (property.type !== 'string') {
                    throw new Error(`Model ${modelName} has invalid id property type ${property.type}`);
                }

                if (property.optional) {
                    throw new Error(`Model ${modelName} has optional id property`);
                }

                if (property.unique !== true) {
                    throw new Error(`The id of model ${modelName} must be unique`);
                }

                if (!property.default || property.default.type !== 'cuid') {
                    throw new Error(`Model ${modelName} must have id property with default type cuid`);
                }

                if (property.gettable !== true) {
                    throw new Error(`Model ${modelName} has id property, but that property is not gettable`);
                }

                if (property.settable === true) {
                    throw new Error(`Model ${modelName} has id property, but that property is settable`);
                }
            }

            let checkType;
            if (property.type === 'array') {
                checkType = property.valueType;
            } else {
                checkType = property.type;
            }

            if (typeof checkType !== 'string' && 'reference' in checkType && checkType.reference && !modelNames.includes(checkType.reference)) {
                throw new Error(`Model ${modelName} has invalid reference ${checkType.reference}`);
            }

            if (
                property.type === 'array' ||
                (typeof checkType !== 'string' && 'reference' in checkType)
            ) {
                if (typeof (property as any).canInfluenceThisOutput !== 'boolean') {
                    throw new Error(`Model ${modelName} has property ${property.name} without canInfluenceThisOutput`);
                }

                if ((property as any).canInfluenceThisOutput === true) {
                    if (model.canInfluenceOutput !== true) {
                        throw new Error(`Model ${modelName} has a property with canInfluenceThisOutput=true, but model ${modelName} does not have canInfluenceOutput=true`);
                    }

                    const referenceModelStructure = structure[(checkType as any).reference as modelName];

                    if (!referenceModelStructure) {
                        throw new Error(`Model ${modelName} has property ${property.name} with invalid reference ${(checkType as any).reference}`);
                    }

                    if (referenceModelStructure.canInfluenceOutput !== true) {
                        throw new Error(`Model ${modelName} has property ${property.name} with canInfluenceThisOutput=true with reference ${(checkType as any).reference}, but that model does not have canInfluenceOutput=true`);
                    }
                }
            }

            if ('backReference' in property && property.backReference !== undefined) {
                const otherModel = structure[property.type.reference];

                if (!otherModel) {
                    throw new Error(`Model ${modelName} has unknown back reference from ${property.type.reference}`);
                }

                const referenceAmount = otherModel.properties.filter(property => {

                    if ('backReference' in property && property.backReference === true) {
                        return false;
                    }

                    if (property.type === 'array') {
                        return typeof property.valueType !== 'string' && property.valueType.reference === modelName;
                    } else {
                        return typeof property.type !== 'string' && property.type.reference === modelName;
                    }

                }).length;

                if (referenceAmount === 0) {
                    throw new Error(`Model ${modelName} has back reference from ${property.type.reference} but the back reference model does not have a reference back`);
                }

                if (referenceAmount > 1) {
                    throw new Error(`Model ${modelName} has back reference from ${property.type.reference} but the back reference model has multiple references back`);
                }
            }
        }
    }
}