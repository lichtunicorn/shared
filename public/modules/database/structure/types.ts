export type structure = Record<string, model>;

export type model = {
    creatable: boolean;
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

export type database = {
    show: show[];
    sequence: sequence[];
    sequenceSceneState: sequenceSceneState[];
    sequenceCuelistState: sequenceCuelistState[];
    group: group[];
    groupElement: groupElement[];
    scene: scene[];
    sceneElement: sceneElement[];
    sceneElementContent: sceneElementContent[];
    cuelist: cuelist[];
    cue: cue[];
    cueElement: cueElement[];
    cueElementContent: cueElementContent[];
    effect: effect[];
    speedGroup: speedGroup[];
    override: override[];
    variable: variable[];
    macro: macro[];
    macroCommand: macroCommand[];
    collection: collection[];
    fixture: fixture[];
    attribute: attribute[];
    preset: preset[];
    executor: executor[];
    customButton: customButton[];
};
export type modelName = "show" | "sequence" | "sequenceSceneState" | "sequenceCuelistState" | "group" | "groupElement" | "scene" | "sceneElement" | "sceneElementContent" | "cuelist" | "cue" | "cueElement" | "cueElementContent" | "effect" | "speedGroup" | "override" | "variable" | "macro" | "macroCommand" | "collection" | "fixture" | "attribute" | "preset" | "executor" | "customButton";
export type public_show = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    name: string;
    /** read only */
    sequences: { reference: string; }[];
    /** read only */
    scenes: { reference: string; }[];
    /** read only */
    cuelists: { reference: string; }[];
    /** read only */
    groups: { reference: string; }[];
    /** read only */
    overrides: { reference: string; }[];
    /** read only */
    macros: { reference: string; }[];
    /** read only */
    effects: { reference: string; }[];
    /** read only */
    collections: { reference: string; }[];
    /** read only */
    variables: { reference: string; }[];
};
export type show = public_show;
export type public_sequence = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only, unique */
    index: number;
    /** read only, this is where the actual sequence contents/state is stored */
    sceneStates: { reference: string; }[];
    /** read only, this is where the actual sequence contents/state is stored */
    cuelistStates: { reference: string; }[];
};
export type sequence = public_sequence;
export type public_sequenceSceneState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    scene: { reference: string; };
    /** settable */
    active: boolean;
    /** read only, back reference */
    sequence: { reference: string; };
};
export type sequenceSceneState = public_sequenceSceneState;
export type public_sequenceCuelistState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    cue: { reference: string; };
    /** settable */
    active: boolean;
    /** read only, back reference */
    sequence: { reference: string; };
};
export type sequenceCuelistState = public_sequenceCuelistState;
export type public_group = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only */
    elements: { reference: string; }[];
};
export type group = public_group;
export type public_groupElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    x: number;
    /** settable */
    y: number;
    /** read only, back reference */
    group: { reference: string; };
};
export type groupElement = public_groupElement;
export type public_scene = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    name: string;
    /** settable, default false */
    active: boolean;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    customButtons: { reference: string; }[];
    /** read only */
    elements: { reference: string; }[];
};
export type scene = public_scene;
export type public_sceneElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    fixtures: null | { reference: string; }[];
    /** settable */
    group: null | { reference: string; };
    /** read only */
    contents: { reference: string; }[];
    /** read only, back reference */
    scene: { reference: string; };
};
export type sceneElement = public_sceneElement;
export type public_sceneElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    preset: null | { reference: string; };
    /** settable */
    attributes: null | { reference: string; }[];
    /** read only, back reference */
    sceneElement: { reference: string; };
};
export type sceneElementContent = public_sceneElementContent;
export type public_cuelist = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    name: string;
    /** settable */
    currentCue: null | number;
    /** settable, default false */
    active: boolean;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    customButtons: { reference: string; }[];
    /** settable */
    cues: { reference: string; }[];
};
export type cuelist = public_cuelist;
export type public_cue = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, back reference */
    macro: null | { reference: string; };
    /** read only */
    elements: { reference: string; }[];
    /** read only, back reference */
    cuelist: { reference: string; };
};
export type cue = public_cue;
export type public_cueElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only */
    fixtures: null | { reference: string; }[];
    /** read only */
    group: null | { reference: string; };
    /** read only */
    contents: { reference: string; }[];
    /** read only, back reference */
    cue: { reference: string; };
};
export type cueElement = public_cueElement;
export type public_cueElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only */
    preset: null | { reference: string; };
    /** read only */
    attributes: null | { reference: string; }[];
    /** read only, back reference */
    cueElement: { reference: string; };
};
export type cueElementContent = public_cueElementContent;
export type public_effect = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, default sine */
    type: "sine" | "step" | "ramp" | "invRamp" | "linearBounce";
    /** settable */
    speedGroup: null | { reference: string; };
    /** settable, default 1 */
    multiplier: number;
};
export type effect = public_effect;
export type public_speedGroup = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, default 60 */
    rate: number;
};
export type speedGroup = public_speedGroup;
export type public_override = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    fixture: { reference: string; };
    /** read only */
    attributes: { reference: string; }[];
};
export type override = public_override;
export type public_variable = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, unique */
    name: string;
    /** settable */
    value: string | number | boolean | null;
    /** settable */
    executors: { reference: string; }[];
};
export type variable = public_variable;
export type public_macro = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    customButtons: { reference: string; }[];
    /** settable */
    cues: null | { reference: string; }[];
    /** read only */
    commands: { reference: string; }[];
};
export type macro = public_macro;
export type public_macroCommand = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only, back reference */
    macro: { reference: string; };
    /** read only, todo: better type */
    contents: string;
};
export type macroCommand = public_macroCommand;
export type public_collection = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    name: string;
    /** settable */
    scenes: { reference: string; }[];
    /** settable */
    cuelists: { reference: string; }[];
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    customButtons: { reference: string; }[];
};
export type collection = public_collection;
export type public_fixture = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    fixtureNumber: number;
    /** settable, default 0 */
    universe: number;
    /** settable, default 0 */
    address: number;
};
export type fixture = public_fixture;
export type public_attribute = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    kind: string;
    /** settable, todo: better type */
    value: string;
};
export type attribute = public_attribute;
export type public_preset = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    name: string;
    /** settable */
    fixtures: null | { reference: string; }[];
    /** settable */
    group: null | { reference: string; };
    /** read only */
    attributes: { reference: string; }[];
};
export type preset = public_preset;
export type public_executor = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only, unique */
    index: number;
    /** settable, back reference */
    scene: null | { reference: string; };
    /** settable, back reference */
    cuelist: null | { reference: string; };
    /** read only, back reference */
    collection: null | { reference: string; };
};
export type executor = public_executor;
export type public_customButton = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, back reference */
    macro: null | { reference: string; };
    /** settable, back reference */
    scene: null | { reference: string; };
    /** settable, back reference */
    cuelist: null | { reference: string; };
    /** read only, back reference */
    collection: null | { reference: string; };
};
export type customButton = Omit<public_customButton, "collection">;

export type modelData<currentModelName extends modelName> = currentModelName extends "show" ? show : currentModelName extends "sequence" ? sequence : currentModelName extends "sequenceSceneState" ? sequenceSceneState : currentModelName extends "sequenceCuelistState" ? sequenceCuelistState : currentModelName extends "group" ? group : currentModelName extends "groupElement" ? groupElement : currentModelName extends "scene" ? scene : currentModelName extends "sceneElement" ? sceneElement : currentModelName extends "sceneElementContent" ? sceneElementContent : currentModelName extends "cuelist" ? cuelist : currentModelName extends "cue" ? cue : currentModelName extends "cueElement" ? cueElement : currentModelName extends "cueElementContent" ? cueElementContent : currentModelName extends "effect" ? effect : currentModelName extends "speedGroup" ? speedGroup : currentModelName extends "override" ? override : currentModelName extends "variable" ? variable : currentModelName extends "macro" ? macro : currentModelName extends "macroCommand" ? macroCommand : currentModelName extends "collection" ? collection : currentModelName extends "fixture" ? fixture : currentModelName extends "attribute" ? attribute : currentModelName extends "preset" ? preset : currentModelName extends "executor" ? executor : currentModelName extends "customButton" ? customButton : never;
export type publicModelData<currentModelName extends modelName> = currentModelName extends "show" ? public_show : currentModelName extends "sequence" ? public_sequence : currentModelName extends "sequenceSceneState" ? public_sequenceSceneState : currentModelName extends "sequenceCuelistState" ? public_sequenceCuelistState : currentModelName extends "group" ? public_group : currentModelName extends "groupElement" ? public_groupElement : currentModelName extends "scene" ? public_scene : currentModelName extends "sceneElement" ? public_sceneElement : currentModelName extends "sceneElementContent" ? public_sceneElementContent : currentModelName extends "cuelist" ? public_cuelist : currentModelName extends "cue" ? public_cue : currentModelName extends "cueElement" ? public_cueElement : currentModelName extends "cueElementContent" ? public_cueElementContent : currentModelName extends "effect" ? public_effect : currentModelName extends "speedGroup" ? public_speedGroup : currentModelName extends "override" ? public_override : currentModelName extends "variable" ? public_variable : currentModelName extends "macro" ? public_macro : currentModelName extends "macroCommand" ? public_macroCommand : currentModelName extends "collection" ? public_collection : currentModelName extends "fixture" ? public_fixture : currentModelName extends "attribute" ? public_attribute : currentModelName extends "preset" ? public_preset : currentModelName extends "executor" ? public_executor : currentModelName extends "customButton" ? public_customButton : never;

// </auto generated, do not edit>
