import type { kind } from "public/kinds";

export type structure = Record<string, model>;

export type model = {
    creatable: boolean;
    deletable?: boolean;
    goable?: boolean;
    selectable?: boolean;
    /** if this is a thing that can be assigned to something else */
    canAssign?: boolean;
    /** if something else can assign to this */
    isAssignable?: boolean;
    /** if this model gets deleted, recursively delete the models inside the references of these properties */
    recursiveDeleteProperties?: string[];
    move?: string;
    properties: property<string>[];
};

export type literalPropertyType = "number" | "string" | "boolean" | "stringOrNumberOrBooleanOrNull" | "attributes";
export type referencePropertyType = {
    reference: string;
};

export type attributesType = {
    [key in kind]?: ({
        subKind: string;
        value: string | boolean;
    } | {
        subKind: string;
        value: number;
        /** How much the value increases per x on the selection grid */
        xIncrease: number;
        /** If the xIncrease is symmetrical on the selection grid */
        xSymmetrical: boolean;
        /** How much the value increases per y on the selection grid */
        yIncrease: number;
        /** If the yIncrease is symmetrical on the selection grid */
        ySymmetrical: boolean;
    })[];
};

export type property<name extends string> = {
    name: name;
    comment?: string;
    optional?: boolean;
    gettable: boolean;
    settable: boolean;
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
            } | {
                type: "name";
            } | {
                type: "now";
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
    section: section[];
    sectionSceneState: sectionSceneState[];
    sectionCuelistState: sectionCuelistState[];
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
    effectOffset: effectOffset[];
    speedGroup: speedGroup[];
    override: override[];
    variable: variable[];
    macro: macro[];
    macroCommand: macroCommand[];
    collection: collection[];
    fixture: fixture[];
    preset: preset[];
    executor: executor[];
    actionButton: actionButton[];
    executorButton: executorButton[];
    executorFader: executorFader[];
    programmerElement: programmerElement[];
    programmerElementContent: programmerElementContent[];
};
export type modelName = "show" | "section" | "sectionSceneState" | "sectionCuelistState" | "group" | "groupElement" | "scene" | "sceneElement" | "sceneElementContent" | "cuelist" | "cue" | "cueElement" | "cueElementContent" | "effect" | "effectOffset" | "speedGroup" | "override" | "variable" | "macro" | "macroCommand" | "collection" | "fixture" | "preset" | "executor" | "actionButton" | "executorButton" | "executorFader" | "programmerElement" | "programmerElementContent";
export type public_show = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    name: string;
    /** settable, default false */
    blind: boolean;
    /** settable, default false */
    highlight: boolean;
    /** read only */
    actionButtons: { reference: string; }[];
    /** read only */
    collections: { reference: string; }[];
    /** read only */
    cuelists: { reference: string; }[];
    /** read only */
    effects: { reference: string; }[];
    /** read only */
    executors: { reference: string; }[];
    /** read only */
    fixtures: { reference: string; }[];
    /** read only */
    groups: { reference: string; }[];
    /** read only */
    macros: { reference: string; }[];
    /** read only */
    overrides: { reference: string; }[];
    /** read only */
    programmerElements: { reference: string; }[];
    /** read only */
    scenes: { reference: string; }[];
    /** read only */
    sections: { reference: string; }[];
    /** read only */
    variables: { reference: string; }[];
};
export type show = public_show;
export type public_section = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only, unique */
    index: number;
    /** read only, this is where the actual section contents/state is stored */
    sceneStates: { reference: string; }[];
    /** read only, this is where the actual section contents/state is stored */
    cuelistStates: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
};
export type section = public_section;
export type public_sectionSceneState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    scene: { reference: string; };
    /** settable */
    active: boolean;
    /** read only, back reference */
    section: { reference: string; };
};
export type sectionSceneState = public_sectionSceneState;
export type public_sectionCuelistState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    cue: { reference: string; };
    /** settable */
    active: boolean;
    /** read only, back reference */
    section: { reference: string; };
};
export type sectionCuelistState = public_sectionCuelistState;
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
    /** settable */
    fixture: { reference: string; };
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
    /** settable, default 0 */
    priority: number;
    /** settable, default 0, 0 if not active. 100 if active. In between if active is crossfading. Active property is only 100 or 0 when automatically fading, releaseStartTime and activeStartTime are used for the in between values. */
    active: number;
    /** read only, dateTime when activated last went of 0. Used for latest takes priority.  If active goes back to 0, activatedAt stays the same. */
    activatedAt: null | number;
    /** read only, dateTime when the scene started a release. Used for fading. Null if not releasing, or in crossfade. Active is original value if this is used */
    releaseStartTime: null | number;
    /** read only, dateTime when the scene started to become active. Used for fading. Null if not active, or in crossfade. Active is new value if this is used */
    activeStartTime: null | number;
    /** settable, default 100, From 0 to 100 */
    intensity: number;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
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
    /** settable, default 0 */
    activeFade: number;
    /** settable, default 0 */
    releaseFade: number;
    /** settable */
    preset: null | { reference: string; };
    /** settable */
    effects: null | { reference: string; }[];
    /** settable */
    attributes: null | attributesType;
    /** read only, back reference */
    sceneElement: { reference: string; };
};
export type sceneElementContent = public_sceneElementContent;
export type public_cuelist = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable, default 0 */
    priority: number;
    /** settable */
    currentCue: null | number;
    /** settable, default 0, 0 if not active. 100 if active. In between if active is crossfading. Active property is only 100 or 0 when automatically fading, releaseStartTime and activeStartTime are used for the in between values. */
    active: number;
    /** read only, dateTime when activated last went of 0. Used for latest takes priority. If active goes back to 0, activatedAt stays the same. */
    activatedAt: null | number;
    /** settable, dateTime when the cuelist started a release. Used for fading. Null if not releasing, or in crossfade */
    releaseStartTime: null | number;
    /** settable, dateTime when the cuelist started to become active. Used for fading. Null if not active, or in crossfade */
    activeStartTime: null | number;
    /** settable, dateTime when the transition from one cue to another started. Used for fading. Null if not transitioning, or in crossfade (between cues) */
    cueStartTime: null | number;
    /** settable, The cue the transition started from. Null if not transitioning between cues, or in crossfade (between cues) */
    transitionFromCue: null | number;
    /** settable, default 100, From 0 to 100 */
    intensity: number;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
    /** settable */
    cues: { reference: string; }[];
};
export type cuelist = public_cuelist;
export type public_cue = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
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
    /** settable */
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
    /** settable */
    index: number;
    /** read only */
    preset: null | { reference: string; };
    /** read only */
    effects: null | { reference: string; }[];
    /** settable */
    attributes: null | attributesType;
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
    /** settable, default 0 */
    wings: number;
    /** settable, default 0 */
    groups: number;
    /** settable, default 0 */
    blocks: number;
    /** settable, default true, If true, effect works for any amount of fixtures. If false, effect works for specific amount of fixtures */
    template: boolean;
    /** settable, default 0, percentage 0 (no offset) to 50 (half offset) to 100 (full offset, so no offset). Null if template is false */
    templateOffsetBase: null | number;
    /** settable, default false, If true, use selection grid. If false, use fixture numbers. Null if template is false */
    templateOffsetSelectionGrid: null | boolean;
    /** settable, default 0, How much the offset increases per fixture. Null if template is false or templateOffsetSelectionGrid is true */
    templateOffsetIncrease: null | number;
    /** settable, How much the offset increases per x on selection grid. Null if template is false or templateOffsetSelectionGrid is false */
    templateOffsetXIncrease: null | number;
    /** settable, If the offset is symmetrical on x on selection grid. Null if template is false or templateOffsetSelectionGrid is false */
    templateOffsetXSymmetrical: null | boolean;
    /** settable, How much the offset increases per y on selection grid. Null if template is false or templateOffsetSelectionGrid is false */
    templateOffsetYIncrease: null | number;
    /** settable, If the offset is symmetrical on y on selection grid. Null if template is false or templateOffsetSelectionGrid is false */
    templateOffsetYSymmetrical: null | number;
    /** settable, The offset per fixture if template = false. Null if template = true */
    nonTemplateOffsets: null | { reference: string; }[];
    /** settable, Where to use the current value. If null, don't use current value */
    currentValue: null | "lowValue" | "middleValue" | "highValue";
    /** settable, The low value of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null */
    lowValue: null | attributesType;
    /** settable, The low preset of the effect. lowValue or lowPreset must be set. If currentValue is lowValue, lowValue and lowPreset must be null. If currentValue is middleValue, lowValue must be set and lowPreset must be null */
    lowPreset: null | { reference: string; };
    /** settable, The high value of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null */
    highValue: null | attributesType;
    /** settable, The high preset of the effect. highValue or highPreset must be set. If currentValue is highValue, highValue and highPreset must be null. If currentValue is middleValue, highValue must be set and highPreset must be null */
    highPreset: null | { reference: string; };
};
export type effect = public_effect;
export type public_effectOffset = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    offset: number;
    /** read only, back reference */
    effects: { reference: string; };
};
export type effectOffset = public_effectOffset;
export type public_speedGroup = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, default 60 */
    bpm: number;
    /** settable, default now() */
    firstHitTime: number;
};
export type speedGroup = public_speedGroup;
export type public_override = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    fixture: { reference: string; };
    /** settable */
    attributes: attributesType;
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
    actionButtons: { reference: string; }[];
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
    /** settable, default name() */
    name: string;
    /** settable */
    scenes: { reference: string; }[];
    /** settable */
    cuelists: { reference: string; }[];
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
};
export type collection = public_collection;
export type public_fixture = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    fixtureNumber: number;
    /** read only */
    fixtureType: string;
    /** settable, default 0 */
    universe: number;
    /** settable, default 0 */
    address: number;
};
export type fixture = public_fixture;
export type public_preset = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable */
    fixtures: null | { reference: string; }[];
    /** settable */
    group: null | { reference: string; };
    /** settable */
    attributes: attributesType;
};
export type preset = public_preset;
export type public_executor = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable */
    faders: { reference: string; };
    /** settable, back reference */
    scene: null | { reference: string; };
    /** settable, back reference */
    cuelist: null | { reference: string; };
    /** settable, back reference */
    collection: null | { reference: string; };
    /** settable */
    executorButtons: { reference: string; }[];
};
export type executor = public_executor;
export type public_actionButton = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, unique */
    physicalButtonIndex: null | number;
    /** settable, back reference */
    macro: null | { reference: string; };
    /** settable, back reference */
    scene: null | { reference: string; };
    /** settable, back reference */
    cuelist: null | { reference: string; };
    /** settable, back reference */
    collection: null | { reference: string; };
    /** settable, back reference */
    section: null | { reference: string; };
    /** settable */
    generalFunction: null | "clear" | "blind" | "highlight" | "previous" | "all" | "next" | "uni" | "nextPage" | "previousPage" | "section-1" | "section-2" | "section-3" | "section-4" | "section-5" | "kindIntensity" | "kindPosition" | "kindColor" | "kindBeam" | "group" | "scene" | "cuelist" | "delete" | "move" | "copy" | "open" | "assign" | "record" | "go" | "empty" | "arrowLeft" | "arrowRight" | "arrowUp" | "arrowDown" | "number0" | "number1" | "number2" | "number3" | "number4" | "number5" | "number6" | "number7" | "number8" | "number9" | "dot" | "at" | "thru" | "plus" | "enter" | "backspace" | "set";
};
export type actionButton = public_actionButton;
export type public_executorButton = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, unique */
    physicalButtonIndex: null | number;
    /** read only, back reference */
    executor: { reference: string; };
    /** settable, default flashFull */
    function: "flashFull" | "flashZero" | "flashActive" | "go" | "goBack" | "release";
};
export type executorButton = public_executorButton;
export type public_executorFader = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    physicalButtonIndex: null | number;
    /** settable, default intensity */
    function: "intensity" | "activeCrossfade" | "cueCrossfade";
};
export type executorFader = public_executorFader;
export type public_programmerElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only, default false */
    selected: boolean;
    /** settable */
    fixtures: null | { reference: string; }[];
    /** settable */
    group: null | { reference: string; };
    /** read only */
    contents: { reference: string; }[];
};
export type programmerElement = public_programmerElement;
export type public_programmerElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only */
    effects: null | { reference: string; }[];
    /** read only */
    preset: null | { reference: string; };
    /** settable */
    attributes: null | attributesType;
    /** read only, back reference */
    programmerElement: { reference: string; };
};
export type programmerElementContent = public_programmerElementContent;

export type modelData<currentModelName extends modelName> = currentModelName extends "show" ? show : currentModelName extends "section" ? section : currentModelName extends "sectionSceneState" ? sectionSceneState : currentModelName extends "sectionCuelistState" ? sectionCuelistState : currentModelName extends "group" ? group : currentModelName extends "groupElement" ? groupElement : currentModelName extends "scene" ? scene : currentModelName extends "sceneElement" ? sceneElement : currentModelName extends "sceneElementContent" ? sceneElementContent : currentModelName extends "cuelist" ? cuelist : currentModelName extends "cue" ? cue : currentModelName extends "cueElement" ? cueElement : currentModelName extends "cueElementContent" ? cueElementContent : currentModelName extends "effect" ? effect : currentModelName extends "effectOffset" ? effectOffset : currentModelName extends "speedGroup" ? speedGroup : currentModelName extends "override" ? override : currentModelName extends "variable" ? variable : currentModelName extends "macro" ? macro : currentModelName extends "macroCommand" ? macroCommand : currentModelName extends "collection" ? collection : currentModelName extends "fixture" ? fixture : currentModelName extends "preset" ? preset : currentModelName extends "executor" ? executor : currentModelName extends "actionButton" ? actionButton : currentModelName extends "executorButton" ? executorButton : currentModelName extends "executorFader" ? executorFader : currentModelName extends "programmerElement" ? programmerElement : currentModelName extends "programmerElementContent" ? programmerElementContent : never;
export type publicModelData<currentModelName extends modelName> = currentModelName extends "show" ? public_show : currentModelName extends "section" ? public_section : currentModelName extends "sectionSceneState" ? public_sectionSceneState : currentModelName extends "sectionCuelistState" ? public_sectionCuelistState : currentModelName extends "group" ? public_group : currentModelName extends "groupElement" ? public_groupElement : currentModelName extends "scene" ? public_scene : currentModelName extends "sceneElement" ? public_sceneElement : currentModelName extends "sceneElementContent" ? public_sceneElementContent : currentModelName extends "cuelist" ? public_cuelist : currentModelName extends "cue" ? public_cue : currentModelName extends "cueElement" ? public_cueElement : currentModelName extends "cueElementContent" ? public_cueElementContent : currentModelName extends "effect" ? public_effect : currentModelName extends "effectOffset" ? public_effectOffset : currentModelName extends "speedGroup" ? public_speedGroup : currentModelName extends "override" ? public_override : currentModelName extends "variable" ? public_variable : currentModelName extends "macro" ? public_macro : currentModelName extends "macroCommand" ? public_macroCommand : currentModelName extends "collection" ? public_collection : currentModelName extends "fixture" ? public_fixture : currentModelName extends "preset" ? public_preset : currentModelName extends "executor" ? public_executor : currentModelName extends "actionButton" ? public_actionButton : currentModelName extends "executorButton" ? public_executorButton : currentModelName extends "executorFader" ? public_executorFader : currentModelName extends "programmerElement" ? public_programmerElement : currentModelName extends "programmerElementContent" ? public_programmerElementContent : never;

// </auto generated, do not edit>
