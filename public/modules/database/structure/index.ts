import type { structure as structureType } from "./types";

import { show } from "./show";
import { section, sectionSceneState, sectionCuelistState } from "./section";
import { group, groupElement } from "./group";
import { scene, sceneElement, sceneElementContent } from "./scene";
import { cuelist, cue, cueElement, cueElementContent } from "./cuelist";
import { effect, speedGroup } from "./effect";
import { override } from "./override";
import { variable } from "./variable";
import { macro, macroCommand } from "./macro";
import { collection } from "./collection";
import { fixture } from "./fixture";
import { attribute, preset } from "./attribute";
import { property } from "zod";

export const structure: structureType = {
    show,
    section,
    sectionSceneState,
    sectionCuelistState,
    group,
    groupElement,
    scene,
    sceneElement,
    sceneElementContent,
    cuelist,
    cue,
    cueElement,
    cueElementContent,
    effect,
    speedGroup,
    override,
    variable,
    macro,
    macroCommand,
    collection,
    fixture,
    attribute,
    preset
};

checkValidity();
function checkValidity() {
    const modelNames = Object.keys(structure);

    for (const [modelName, model] of Object.entries(structure)) {

        if (!model.gettable || !Array.isArray(model.gettable)) {
            throw new Error(`Model ${modelName} must have array gettable`);
        }

        if (!model.settable || !Array.isArray(model.settable)) {
            throw new Error(`Model ${modelName} must have array settable`);
        }

        if (model.gettable.some(name =>
            !model.properties.find(property => property.name === name)
        )) {
            throw new Error(`Model ${modelName} has invalid gettable property ${model.gettable.find(name =>
                !model.properties.find(property => property.name === name)
            )}`);
        }

        if (model.settable.some(name =>
            !model.properties.find(property => property.name === name)
        )) {
            throw new Error(`Model ${modelName} has invalid settable property ${model.settable.find(name =>
                !model.properties.find(property => property.name === name)
            )}`);
        }

        if (model.move) {
            if (!model.properties.find(property => property.name === model.move)) {
                throw new Error(`Model ${modelName} has invalid move property ${model.move}`);
            }

            if (!model.settable.includes(model.move)) {
                throw new Error(`Model ${modelName} has move property ${model.move}, but that property is not settable`);
            }
        }

        if (!model.properties.find(a => a.name === 'id')) {
            throw new Error(`Model ${modelName} has no id property`);
        }

        for (const property of model.properties) {
            if (property.name === 'id') {
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