export type structure = Record<string, model>;

export type model = {
    deletable?: boolean;
    goable?: boolean;
    /** if this is a thing that can be assigned to something else */
    canAssign?: boolean;
    /** if something else can assign to this */
    isAssignable?: boolean;
    /** if this model gets deleted, recursively delete the models inside the references of these properties */
    recursiveDeleteProperties?: string[];
    gettable: string[];
    settable: string[];
    move?: string;
    properties: property[];
};

export type literalPropertyType = "number" | "string" | "boolean" | "stringOrNumberOrBooleanOrNull";
export type referencePropertyType = {
    reference: string;
};

export type property = {
    name: string;
    optional?: boolean;
} &
    (
        {
            type: literalPropertyType;
            unique?: boolean;
            default?: {
                type: "cuid";
            } | {
                type: "value";
                value: any;
            };
        } | {
            type: referencePropertyType;
            unique?: boolean;
            backReference?: boolean;
        } | {
            type: "array";
            valueType: referencePropertyType;
        } | {
            type: "oneOf";
            options: string[];
            default?: {
                type: "value";
                value: string;
            }
        }
    );

// <auto generated, do not edit>
export type modelName = "show" | "section" | "sectionSceneState" | "sectionCuelistState" | "group" | "groupElement" | "scene" | "sceneElement" | "sceneElementContent" | "cuelist" | "cue" | "cueElement" | "cueElementContent" | "effect" | "speedGroup" | "override" | "variable" | "macro" | "macroCommand" | "collection" | "fixture" | "attribute" | "preset";
export type show = {
    id: string;
    name: string;
    sections: { reference: string; }[];
    scenes: { reference: string; }[];
    cuelists: { reference: string; }[];
    groups: { reference: string; }[];
    overrides: { reference: string; }[];
    macros: { reference: string; }[];
    effects: { reference: string; }[];
    collections: { reference: string; }[];
    variables: { reference: string; }[];
};
export type section = {
    id: string;
    index: number;
    global: boolean;
    sceneStates: { reference: string; }[];
    cuelistStates: { reference: string; }[];
};
export type sectionSceneState = {
    id: string;
    scene: { reference: string; };
    active: boolean;
    section: { reference: string; };
};
export type sectionCuelistState = {
    id: string;
    cue: { reference: string; };
    active: boolean;
    section: { reference: string; };
};
export type group = {
    id: string;
    index: number;
    elements: { reference: string; }[];
};
export type groupElement = {
    id: string;
    x: number;
    y: number;
    group: { reference: string; };
};
export type scene = {
    id: string;
    index: number;
    name: string;
    elements: { reference: string; }[];
};
export type sceneElement = {
    id: string;
    index: number;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    contents: { reference: string; }[];
    scene: { reference: string; };
};
export type sceneElementContent = {
    id: string;
    index: number;
    preset: null | { reference: string; };
    attributes: null | { reference: string; }[];
    sceneElement: { reference: string; };
};
export type cuelist = {
    id: string;
    index: number;
    name: string;
    cues: { reference: string; }[];
};
export type cue = {
    id: string;
    index: number;
    elements: { reference: string; }[];
    cuelist: { reference: string; };
};
export type cueElement = {
    id: string;
    index: number;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    contents: { reference: string; }[];
    cue: { reference: string; };
};
export type cueElementContent = {
    id: string;
    index: number;
    preset: null | { reference: string; };
    attributes: null | { reference: string; }[];
    cueElement: { reference: string; };
};
export type effect = {
    id: string;
    index: number;
    type: "sine" | "step" | "ramp" | "invRamp" | "linearBounce";
    speedGroup: null | { reference: string; };
    multiplier: number;
};
export type speedGroup = {
    id: string;
    rate: number;
};
export type override = {
    id: string;
    fixture: { reference: string; };
    attributes: { reference: string; }[];
};
export type variable = {
    id: string;
    index: number;
    name: string;
    value: string | number | boolean | null;
};
export type macro = {
    id: string;
    index: number;
    commands: { reference: string; }[];
};
export type macroCommand = {
    id: string;
    index: number;
    macro: { reference: string; };
};
export type collection = {
    id: string;
    index: number;
    name: string;
    scenes: { reference: string; }[];
    cuelists: { reference: string; }[];
};
export type fixture = {
    id: string;
    fixtureNumber: number;
    universe: number;
    address: number;
};
export type attribute = {
    id: string;
    kind: string;
    value: string;
};
export type preset = {
    id: string;
    index: number;
    name: string;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    attributes: { reference: string; }[];
};

export type modelData<currentModelName extends modelName> = currentModelName extends "show" ? show : currentModelName extends "section" ? section : currentModelName extends "sectionSceneState" ? sectionSceneState : currentModelName extends "sectionCuelistState" ? sectionCuelistState : currentModelName extends "group" ? group : currentModelName extends "groupElement" ? groupElement : currentModelName extends "scene" ? scene : currentModelName extends "sceneElement" ? sceneElement : currentModelName extends "sceneElementContent" ? sceneElementContent : currentModelName extends "cuelist" ? cuelist : currentModelName extends "cue" ? cue : currentModelName extends "cueElement" ? cueElement : currentModelName extends "cueElementContent" ? cueElementContent : currentModelName extends "effect" ? effect : currentModelName extends "speedGroup" ? speedGroup : currentModelName extends "override" ? override : currentModelName extends "variable" ? variable : currentModelName extends "macro" ? macro : currentModelName extends "macroCommand" ? macroCommand : currentModelName extends "collection" ? collection : currentModelName extends "fixture" ? fixture : currentModelName extends "attribute" ? attribute : currentModelName extends "preset" ? preset : never;

// </auto generated, do not edit>
