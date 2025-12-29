import fs from "fs";
import path from "path";

import type { modelName, structure as structureType } from "./types";

import { show } from "./show";
import { section, sectionSceneState, sectionCuelistState } from "./section";
import { group, groupElement } from "./group";
import { scene, sceneElement, sceneElementContent } from "./scene";
import { cuelist, cue, cueElement, cueElementContent } from "./cuelist";
import { effect, speedGroup, effectKind, effectOffset } from "./effect";
import { override } from "./override";
import { variable } from "./variable";
import { macro, macroCommand } from "./macro";
import { collection } from "./collection";
import { fixture } from "./fixture";
import { preset, presetElement } from "./preset";
import { executor, executorButton, executorFader } from "./executor";
import { actionButton } from "./actionButton";
import { programmerElement, programmerElementContent } from "./programmer";

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
    effectOffset,
    effectKind,
    speedGroup,
    override,
    variable,
    macro,
    macroCommand,
    collection,
    fixture,
    preset,
    presetElement,
    executor,
    actionButton,
    executorButton,
    executorFader,
    programmerElement,
    programmerElementContent
};

checkValidity();
function checkValidity() {
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

updateConstTypes();
function updateConstTypes() {
    const startString = '\n// <auto generated, do not edit>';
    const endString = '\n// </auto generated, do not edit>';

    const typesContents = fs.readFileSync(path.join(__dirname, 'types.ts'), 'utf-8');

    const beginIndex = typesContents.indexOf(startString);
    const endIndex = typesContents.indexOf(endString);

    if (beginIndex === -1 || endIndex === -1) {
        throw new Error('Could not find generated types in types.ts');
    }

    const fileStart = typesContents.substring(0, beginIndex);
    const fileEnd = typesContents.substring(endIndex + endString.length);

    const constTypes = generateAutoTypes(structure);

    const newTypesContents = `${fileStart}${startString}${constTypes}${endString}${fileEnd}`;

    if (newTypesContents !== typesContents) {
        console.warn('Database structure types have changed inside shared. Run "bun u" inside shared and make a new commit');

        fs.writeFileSync(path.join(__dirname, 'types.ts'), newTypesContents);
    }
}

function generatePublicModelTypeContents(modelStructure: structureType[string]): string {
    let output = '';

    for (const property of modelStructure.properties) {
        let typescriptType: string;

        if (property.type === 'array') {
            typescriptType = `{ reference: string; }[]`;
        } else if (property.type === 'boolean') {
            typescriptType = 'boolean';
        } else if (property.type === 'string') {
            typescriptType = 'string';
        } else if (property.type === 'number') {
            typescriptType = 'number';
        } else if (property.type === 'oneOf') {
            typescriptType = property.options.map(option => `"${option}"`).join(' | ');
        } else if (property.type === 'stringOrNumberOrBooleanOrNull') {
            typescriptType = 'string | number | boolean | null';
        } else if (typeof property.type !== 'string' && property.type.reference) {
            typescriptType = `{ reference: string; }`;
        } else if (property.type === 'attributes') {
            typescriptType = 'attributesType';
        } else {
            throw new Error(`Unknown property type ${property.type}`);
        }

        if (property.optional && property.type !== 'stringOrNumberOrBooleanOrNull') {
            typescriptType = `null | ${typescriptType}`;
        }

        let comment = property.comment;

        if ('default' in property && property.default) {
            let string;

            if (property.default.type === 'value') {
                string = `${property.default.value}`;
            } else if (property.default.type === 'cuid') {
                string = 'cuid()';
            } else if (property.default.type === 'name') {
                string = 'name()';
            } else if (property.default.type === 'now') {
                string = 'now()';
            } else {
                throw new Error(`Unknown default type ${(property.default as any).type}`);
            }

            if (comment) {
                comment = `default ${string}, ${comment}`;
            } else {
                comment = `default ${string}`;
            }
        }

        if ('backReference' in property && property.backReference) {
            if (comment) {
                comment = `back reference, ${comment}`;
            } else {
                comment = 'back reference';
            }
        }

        if ('unique' in property && property.unique) {
            if (comment) {
                comment = `unique, ${comment}`;
            } else {
                comment = 'unique';
            }
        }

        if (property.settable) {
            if (comment) {
                comment = `settable, ${comment}`;
            } else {
                comment = 'settable';
            }
        } else {
            if (comment) {
                comment = `read only, ${comment}`;
            } else {
                comment = 'read only';
            }
        }

        if (comment) {
            output += `    /** ${comment} */\n`;
        }
        output += `    ${property.name}: ${typescriptType};\n`;
    }

    return output;
}

function generateAutoTypes(structure: structureType): string {
    let output = '\n\n';

    output += `export type database = {\n`;
    for (const [modelName, modelStructure] of Object.entries(structure)) {
        output += `    ${modelName}: ${modelName}[];\n`;
    }
    output += `};\n`;

    output += `export type modelName = ${Object.keys(structure).map(modelName => `"${modelName}"`).join(' | ')};\n`;

    for (const [modelName, modelStructure] of Object.entries(structure)) {
        const publicModelOutput = generatePublicModelTypeContents(modelStructure);

        output += `export type public_${modelName} = {\n${publicModelOutput}};\n`;

        const privateProperties = modelStructure.properties.filter(property => property.gettable !== true);

        if (privateProperties.length === 0) {
            output += `export type ${modelName} = public_${modelName};\n`;
        } else {
            output += `export type ${modelName} = Omit<public_${modelName}, ${privateProperties.map(property => `"${property.name}"`).join(' | ')
                }>;\n`;
        }
    }

    output += `\nexport type modelData<currentModelName extends modelName> = ${Object.keys(structure).map(modelName =>
        `currentModelName extends "${modelName}" ? ${modelName}`
    ).join(' : ')
        } : never;\n`;

    output += `export type publicModelData<currentModelName extends modelName> = ${Object.keys(structure).map(modelName =>
        `currentModelName extends "${modelName}" ? public_${modelName}`
    ).join(' : ')
        } : never;\n`;

    output += `\nexport type canInfluenceOutputModelName = ${Object.entries(structure).filter(([modelName, modelStructure]) => modelStructure.canInfluenceOutput === true).map(([modelName]) => `"${modelName}"`).join(' | ')};\n`;

    return output;
}