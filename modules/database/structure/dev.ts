import fs from 'fs';
import path from 'path';

import type { structure as structureType } from './types';

import { structure } from './index';

updateConstTypes();
function updateConstTypes() {
    // @ts-ignore
    if (typeof window !== 'undefined' || typeof __dirname === 'undefined') return;

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