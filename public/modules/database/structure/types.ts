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
    properties: property<string>[];
};

export type literalPropertyType = "number" | "string" | "boolean" | "stringOrNumberOrBooleanOrNull";
export type referencePropertyType = {
    reference: string;
};

export type property<name extends string> = {
    name: name;
    comment?: string;
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
export type public_show = {
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
export type show = public_show;
export type public_section = {
    id: string;
    index: number;
    global: boolean;
    sceneStates: { reference: string; }[];
    cuelistStates: { reference: string; }[];
};
export type section = public_section;
export type public_sectionSceneState = {
    id: string;
    scene: { reference: string; };
    active: boolean;
    section: { reference: string; };
};
export type sectionSceneState = public_sectionSceneState;
export type public_sectionCuelistState = {
    id: string;
    cue: { reference: string; };
    active: boolean;
    section: { reference: string; };
};
export type sectionCuelistState = public_sectionCuelistState;
export type public_group = {
    id: string;
    index: number;
    elements: { reference: string; }[];
};
export type group = public_group;
export type public_groupElement = {
    id: string;
    x: number;
    y: number;
    group: { reference: string; };
};
export type groupElement = public_groupElement;
export type public_scene = {
    id: string;
    index: number;
    name: string;
    elements: { reference: string; }[];
};
export type scene = public_scene;
export type public_sceneElement = {
    id: string;
    index: number;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    contents: { reference: string; }[];
    scene: { reference: string; };
};
export type sceneElement = public_sceneElement;
export type public_sceneElementContent = {
    id: string;
    index: number;
    preset: null | { reference: string; };
    attributes: null | { reference: string; }[];
    sceneElement: { reference: string; };
};
export type sceneElementContent = public_sceneElementContent;
export type public_cuelist = {
    id: string;
    index: number;
    name: string;
    cues: { reference: string; }[];
};
export type cuelist = public_cuelist;
export type public_cue = {
    id: string;
    index: number;
    elements: { reference: string; }[];
    cuelist: { reference: string; };
};
export type cue = public_cue;
export type public_cueElement = {
    id: string;
    index: number;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    contents: { reference: string; }[];
    cue: { reference: string; };
};
export type cueElement = public_cueElement;
export type public_cueElementContent = {
    id: string;
    index: number;
    preset: null | { reference: string; };
    attributes: null | { reference: string; }[];
    cueElement: { reference: string; };
};
export type cueElementContent = public_cueElementContent;
export type public_effect = {
    id: string;
    index: number;
    type: "sine" | "step" | "ramp" | "invRamp" | "linearBounce";
    speedGroup: null | { reference: string; };
    multiplier: number;
};
export type effect = public_effect;
export type public_speedGroup = {
    id: string;
    rate: number;
};
export type speedGroup = public_speedGroup;
export type public_override = {
    id: string;
    fixture: { reference: string; };
    attributes: { reference: string; }[];
};
export type override = public_override;
export type public_variable = {
    id: string;
    index: number;
    name: string;
    value: string | number | boolean | null;
};
export type variable = public_variable;
export type public_macro = {
    id: string;
    index: number;
    commands: { reference: string; }[];
};
export type macro = public_macro;
export type public_macroCommand = {
    id: string;
    index: number;
    macro: { reference: string; };
};
export type macroCommand = public_macroCommand;
export type public_collection = {
    id: string;
    index: number;
    name: string;
    scenes: { reference: string; }[];
    cuelists: { reference: string; }[];
};
export type collection = public_collection;
export type public_fixture = {
    id: string;
    fixtureNumber: number;
    universe: number;
    address: number;
};
export type fixture = public_fixture;
export type public_attribute = {
    id: string;
    kind: string;
    value: string;
};
export type attribute = public_attribute;
export type public_preset = {
    id: string;
    index: number;
    name: string;
    fixtures: null | { reference: string; }[];
    group: null | { reference: string; };
    attributes: { reference: string; }[];
};
export type preset = public_preset;

export type modelData<currentModelName extends modelName> = currentModelName extends "show" ? show : currentModelName extends "section" ? section : currentModelName extends "sectionSceneState" ? sectionSceneState : currentModelName extends "sectionCuelistState" ? sectionCuelistState : currentModelName extends "group" ? group : currentModelName extends "groupElement" ? groupElement : currentModelName extends "scene" ? scene : currentModelName extends "sceneElement" ? sceneElement : currentModelName extends "sceneElementContent" ? sceneElementContent : currentModelName extends "cuelist" ? cuelist : currentModelName extends "cue" ? cue : currentModelName extends "cueElement" ? cueElement : currentModelName extends "cueElementContent" ? cueElementContent : currentModelName extends "effect" ? effect : currentModelName extends "speedGroup" ? speedGroup : currentModelName extends "override" ? override : currentModelName extends "variable" ? variable : currentModelName extends "macro" ? macro : currentModelName extends "macroCommand" ? macroCommand : currentModelName extends "collection" ? collection : currentModelName extends "fixture" ? fixture : currentModelName extends "attribute" ? attribute : currentModelName extends "preset" ? preset : never;
export type publicModelData<currentModelName extends modelName> = currentModelName extends "show" ? public_show : currentModelName extends "section" ? public_section : currentModelName extends "sectionSceneState" ? public_sectionSceneState : currentModelName extends "sectionCuelistState" ? public_sectionCuelistState : currentModelName extends "group" ? public_group : currentModelName extends "groupElement" ? public_groupElement : currentModelName extends "scene" ? public_scene : currentModelName extends "sceneElement" ? public_sceneElement : currentModelName extends "sceneElementContent" ? public_sceneElementContent : currentModelName extends "cuelist" ? public_cuelist : currentModelName extends "cue" ? public_cue : currentModelName extends "cueElement" ? public_cueElement : currentModelName extends "cueElementContent" ? public_cueElementContent : currentModelName extends "effect" ? public_effect : currentModelName extends "speedGroup" ? public_speedGroup : currentModelName extends "override" ? public_override : currentModelName extends "variable" ? public_variable : currentModelName extends "macro" ? public_macro : currentModelName extends "macroCommand" ? public_macroCommand : currentModelName extends "collection" ? public_collection : currentModelName extends "fixture" ? public_fixture : currentModelName extends "attribute" ? public_attribute : currentModelName extends "preset" ? public_preset : never;

// </auto generated, do not edit>
