import type { kind } from "../../../kinds";

export type structure = Record<string, model>;

export type model = {
    canInfluenceOutput?: boolean;
    creatable: boolean;
    deletable?: boolean;
    goable?: boolean;
    releasable?: boolean;
    selectable?: boolean;
    displayName: string;
    /** if this is a thing that can be assigned to something else */
    canAssign?: boolean;
    /** if something else can assign to this */
    isAssignable?: boolean;
    /** if this model gets deleted, recursively delete the models inside the references of these properties */
    recursiveDeleteProperties?: string[];
    recursiveCopyProperties?: string[];
    copyUniqueContextProperties?: string[];
    move?: string;
    properties: property<string>[];
};

export type literalPropertyType = "number" | "string" | "boolean" | "stringOrNumberOrBooleanOrNull" | "attributes";
export type referencePropertyType = {
    reference: modelName;
};

export type attributesType = {
    [key in kind]?: attributesSubKindType[];
};

export type attributesSubKindType = {
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

    xWings: null | number;
    xGroups: null | number;
    xBlocks: null | number;

    yWings: null | number;
    yGroups: null | number;
    yBlocks: null | number;
};

export type property<name extends string> = {
    name: name;
    displayName: string;
    comment?: string;
    optional?: boolean;
    gettable: boolean;
    settable: boolean;
    copyable?: boolean;
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
            } | {
                type: "afterLast";
            };
        } | {
            type: referencePropertyType;
            unique?: boolean;
            backReference?: boolean;
            canInfluenceThisOutput: boolean;
        } | {
            type: "array";
            valueType: referencePropertyType;
            canInfluenceThisOutput: boolean;
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
    executor: executor[];
    actionButton: actionButton[];
    macro: macro[];
    variable: variable[];
    speedGroup: speedGroup[];
    scene: scene[];
    cuelist: cuelist[];
    collection: collection[];
    section: section[];
    fixture: fixture[];
    group: group[];
    preset: preset[];
    effect: effect[];
    show: show[];
    cue: cue[];
    override: override[];
    sectionSceneState: sectionSceneState[];
    sectionCuelistState: sectionCuelistState[];
    groupElement: groupElement[];
    sceneElement: sceneElement[];
    sceneElementContent: sceneElementContent[];
    cueElement: cueElement[];
    cueElementContent: cueElementContent[];
    effectElement: effectElement[];
    effectOffset: effectOffset[];
    effectKind: effectKind[];
    macroCommand: macroCommand[];
    presetElement: presetElement[];
    executorButton: executorButton[];
    executorFader: executorFader[];
    programmerElement: programmerElement[];
    programmerElementContent: programmerElementContent[];
};
export type modelName = "executor" | "actionButton" | "macro" | "variable" | "speedGroup" | "scene" | "cuelist" | "collection" | "section" | "fixture" | "group" | "preset" | "effect" | "show" | "cue" | "override" | "sectionSceneState" | "sectionCuelistState" | "groupElement" | "sceneElement" | "sceneElementContent" | "cueElement" | "cueElementContent" | "effectElement" | "effectOffset" | "effectKind" | "macroCommand" | "presetElement" | "executorButton" | "executorFader" | "programmerElement" | "programmerElementContent";
export type executor = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable, back reference */
    scene: null | { reference: string; };
    /** settable, back reference */
    cuelist: null | { reference: string; };
    /** settable, back reference */
    collection: null | { reference: string; };
    /** settable, back reference, Variable uses intensity fader function */
    variable: null | { reference: string; };
    /** settable */
    faders: { reference: string; }[];
    /** settable */
    buttons: { reference: string; }[];
};
export type public_executor = executor;
export type public_settable_executor = Omit<public_executor, "id">;
export type copyUniqueContext_executor = {
    /** settable, unique */
    index: number;
};
export type actionButton = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
    name: string;
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
    generalFunction: null | "clear" | "blind" | "highlight" | "previous" | "all" | "next" | "uni" | "nextPage" | "previousPage" | "nextSection" | "section-1" | "section-2" | "section-3" | "section-4" | "section-5" | "kindIntensity" | "kindPosition" | "kindColor" | "kindBeam" | "kindControl" | "group" | "scene" | "cuelist" | "empty" | "copy" | "move" | "delete" | "select" | "record" | "setAttribute" | "go" | "release" | "assign" | "open" | "arrowLeft" | "arrowRight" | "arrowUp" | "arrowDown" | "number0" | "number1" | "number2" | "number3" | "number4" | "number5" | "number6" | "number7" | "number8" | "number9" | "dot" | "at" | "thru" | "plus" | "enter" | "backspace" | "set";
};
export type public_actionButton = actionButton;
export type public_settable_actionButton = Omit<public_actionButton, "id">;
export type copyUniqueContext_actionButton = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type macro = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable */
    actionButtons: { reference: string; }[];
    /** settable */
    cues: null | { reference: string; }[];
    /** read only */
    commands: { reference: string; }[];
};
export type public_macro = macro;
export type public_settable_macro = Omit<public_macro, "id" | "commands">;
export type copyUniqueContext_macro = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type variable = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, unique, default name() */
    name: string;
    /** settable */
    value: string | number | boolean | null;
    /** settable */
    executors: { reference: string; }[];
};
export type public_variable = variable;
export type public_settable_variable = Omit<public_variable, "id">;
export type copyUniqueContext_variable = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type speedGroup = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable, default 60 */
    bpm: number;
    /** settable, default now() */
    firstHitTime: number;
};
export type public_speedGroup = speedGroup;
export type public_settable_speedGroup = Omit<public_speedGroup, "id">;
export type copyUniqueContext_speedGroup = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type scene = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
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
    /** settable, default 0, From 0 to 100 */
    intensity: number;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
    /** read only */
    elements: { reference: string; }[];
};
export type public_scene = scene;
export type public_settable_scene = Omit<public_scene, "id" | "activatedAt" | "releaseStartTime" | "activeStartTime" | "elements">;
export type copyUniqueContext_scene = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type cuelist = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable, default 0 */
    priority: number;
    /** settable */
    currentCue: null | number;
    /** settable, default 0, 0 if not active. 100 if active. In between if active is crossfading. Active property is only 100 or 0 when automatically fading, releaseStartTime and activeStartTime are used for the in between values. */
    active: number;
    /** settable, From 0 to 100. 0 if at transitionFromCue. 100 if at currentCue. Null if not transitioning between cues */
    cueCrossfade: null | number;
    /** read only, dateTime when activated last went of 0. Used for latest takes priority. If active goes back to 0, activatedAt stays the same. */
    activatedAt: null | number;
    /** settable, dateTime when the cuelist started a release. Used for fading. Null if not releasing, or in crossfade. Active is original value if this is used */
    releaseStartTime: null | number;
    /** settable, dateTime when the cuelist started to become active. Used for fading. Null if not active, or in crossfade. Active is new value if this is used */
    activeStartTime: null | number;
    /** settable, dateTime when the transition from one cue to another started. Used for fading. Null if not transitioning, or in crossfade (between cues) */
    cueStartTime: null | number;
    /** settable, The cue the transition started from. Null if not transitioning between cues */
    transitionFromCue: null | number;
    /** settable, default 0, From 0 to 100 */
    intensity: number;
    /** settable */
    executors: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
    /** settable */
    cues: { reference: string; }[];
};
export type public_cuelist = cuelist;
export type public_settable_cuelist = Omit<public_cuelist, "id" | "activatedAt">;
export type copyUniqueContext_cuelist = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type collection = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
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
export type public_collection = collection;
export type public_settable_collection = Omit<public_collection, "id">;
export type copyUniqueContext_collection = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type section = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only, unique, default afterLast() */
    index: number;
    /** read only, this is where the actual section contents/state is stored */
    sceneStates: { reference: string; }[];
    /** read only, this is where the actual section contents/state is stored */
    cuelistStates: { reference: string; }[];
    /** settable */
    actionButtons: { reference: string; }[];
};
export type public_section = section;
export type public_settable_section = Omit<public_section, "id" | "index" | "sceneStates" | "cuelistStates">;
export type copyUniqueContext_section = {
    /** read only, unique, default afterLast() */
    index: number;
};
export type fixture = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** read only */
    fixtureType: string;
    /** settable, default 0 */
    universe: null | number;
    /** settable, default 0 */
    address: null | number;
};
export type public_fixture = fixture;
export type public_settable_fixture = Omit<public_fixture, "id" | "fixtureType">;
export type copyUniqueContext_fixture = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type group = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, default name() */
    name: string;
    /** read only */
    elements: { reference: string; }[];
};
export type public_group = group;
export type public_settable_group = Omit<public_group, "id" | "elements">;
export type copyUniqueContext_group = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type preset = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable, If true, uses the selection grid stored in the preset. If false, uses the selection grid of the model referencing the preset */
    usePresetSelectionGrid: boolean;
    /** settable, default name() */
    name: string;
    /** settable */
    elements: { reference: string; }[];
};
export type public_preset = preset;
export type public_settable_preset = Omit<public_preset, "id">;
export type copyUniqueContext_preset = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type effect = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, default name() */
    name: string;
    /** settable, unique, default afterLast() */
    index: number;
    /** settable */
    elements: { reference: string; }[];
};
export type public_effect = effect;
export type public_settable_effect = Omit<public_effect, "id">;
export type copyUniqueContext_effect = {
    /** settable, unique, default afterLast() */
    index: number;
};
export type show = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, default name() */
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
export type public_show = show;
export type public_settable_show = Omit<public_show, "id" | "actionButtons" | "collections" | "cuelists" | "effects" | "executors" | "fixtures" | "groups" | "macros" | "overrides" | "programmerElements" | "scenes" | "sections" | "variables">;
export type copyUniqueContext_show = {
};
export type cue = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    index: number;
    /** settable, default name() */
    name: string;
    /** settable, default 0 */
    cueFade: number;
    /** settable, back reference */
    macro: null | { reference: string; };
    /** read only */
    elements: { reference: string; }[];
    /** read only, back reference */
    cuelist: { reference: string; };
};
export type public_cue = cue;
export type public_settable_cue = Omit<public_cue, "id" | "elements" | "cuelist">;
export type copyUniqueContext_cue = {
    /** settable */
    index: number;
    /** read only, back reference */
    cuelist: { reference: string; };
};
export type override = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    fixture: { reference: string; };
    /** settable */
    attributes: attributesType;
};
export type public_override = override;
export type public_settable_override = Omit<public_override, "id">;
export type copyUniqueContext_override = {
};
export type sectionSceneState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    scene: { reference: string; };
    /** settable */
    active: boolean;
    /** read only, back reference */
    section: { reference: string; };
};
export type public_sectionSceneState = sectionSceneState;
export type public_settable_sectionSceneState = Omit<public_sectionSceneState, "id" | "scene" | "section">;
export type copyUniqueContext_sectionSceneState = {
    /** read only, back reference */
    section: { reference: string; };
};
export type sectionCuelistState = {
    /** read only, unique, default cuid() */
    id: string;
    /** read only */
    cuelist: { reference: string; };
    /** settable */
    currentCue: null | number;
    /** settable */
    active: boolean;
    /** read only, back reference */
    section: { reference: string; };
};
export type public_sectionCuelistState = sectionCuelistState;
export type public_settable_sectionCuelistState = Omit<public_sectionCuelistState, "id" | "cuelist" | "section">;
export type copyUniqueContext_sectionCuelistState = {
    /** read only, back reference */
    section: { reference: string; };
};
export type groupElement = {
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
export type public_groupElement = groupElement;
export type public_settable_groupElement = Omit<public_groupElement, "id" | "group">;
export type copyUniqueContext_groupElement = {
    /** read only, back reference */
    group: { reference: string; };
};
export type sceneElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
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
export type public_sceneElement = sceneElement;
export type public_settable_sceneElement = Omit<public_sceneElement, "id" | "contents" | "scene">;
export type copyUniqueContext_sceneElement = {
    /** settable */
    index: number;
    /** read only, back reference */
    scene: { reference: string; };
};
export type sceneElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
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
export type public_sceneElementContent = sceneElementContent;
export type public_settable_sceneElementContent = Omit<public_sceneElementContent, "id" | "sceneElement">;
export type copyUniqueContext_sceneElementContent = {
    /** settable */
    index: number;
    /** read only, back reference */
    sceneElement: { reference: string; };
};
export type cueElement = {
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
export type public_cueElement = cueElement;
export type public_settable_cueElement = Omit<public_cueElement, "id" | "fixtures" | "group" | "contents" | "cue">;
export type copyUniqueContext_cueElement = {
    /** settable */
    index: number;
    /** read only, back reference */
    cue: { reference: string; };
};
export type cueElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    index: number;
    /** settable, default 0 */
    activeFade: number;
    /** settable, default 0 */
    releaseFade: number;
    /** read only */
    preset: null | { reference: string; };
    /** read only */
    effects: null | { reference: string; }[];
    /** settable */
    attributes: null | attributesType;
    /** read only, back reference */
    cueElement: { reference: string; };
};
export type public_cueElementContent = cueElementContent;
export type public_settable_cueElementContent = Omit<public_cueElementContent, "id" | "preset" | "effects" | "cueElement">;
export type copyUniqueContext_cueElementContent = {
    /** settable */
    index: number;
    /** read only, back reference */
    cueElement: { reference: string; };
};
export type effectElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    index: number;
    /** read only, back reference */
    effect: { reference: string; };
    /** settable */
    kinds: { reference: string; }[];
    /** settable, default sine */
    type: "sine" | "step" | "ramp" | "invRamp" | "linearBounce";
    /** settable */
    speedGroup: { reference: string; };
    /** settable, default 1 */
    multiplier: number;
    /** settable, default true, If true, effect works for any amount of fixtures. If false, effect works for specific amount of fixtures */
    template: boolean;
    /** settable, default 0, percentage 0 (no offset) to 50 (half offset) to 100 (full offset, so no offset). Null if template is false */
    templateOffsetBase: null | number;
    /** settable, Wings for this effect. If template is true, this is only for the x axis */
    xWings: null | number;
    /** settable, Groups for this effect. If template is true, this is only for the x axis */
    xGroups: null | number;
    /** settable, Blocks for this effect. If template is true, this is only for the x axis */
    xBlocks: null | number;
    /** settable, Wings for this effect on the y axis. This is null if template is false */
    yWings: null | number;
    /** settable, Groups for this effect on the y axis. This is null if template is false */
    yGroups: null | number;
    /** settable, Blocks for this effect on the y axis. This is null if template is false */
    yBlocks: null | number;
    /** settable, How much the offset increases per x on selection grid. If template is false this is null */
    templateOffsetXIncrease: null | number;
    /** settable, If the offset is symmetrical on x on selection grid. If template is false this is null */
    templateOffsetXSymmetrical: null | boolean;
    /** settable, How much the offset increases per y on selection grid. If template is false this is null */
    templateOffsetYIncrease: null | number;
    /** settable, If the offset is symmetrical on y on selection grid. If template is false this is null */
    templateOffsetYSymmetrical: null | boolean;
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
export type public_effectElement = effectElement;
export type public_settable_effectElement = Omit<public_effectElement, "id" | "effect">;
export type copyUniqueContext_effectElement = {
    /** settable */
    index: number;
    /** read only, back reference */
    effect: { reference: string; };
};
export type effectOffset = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    offset: number;
    /** read only, back reference */
    effectElement: { reference: string; };
};
export type public_effectOffset = effectOffset;
export type public_settable_effectOffset = Omit<public_effectOffset, "id" | "effectElement">;
export type copyUniqueContext_effectOffset = {
    /** read only, back reference */
    effectElement: { reference: string; };
};
export type effectKind = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    kind: "intensity" | "position" | "color" | "beam" | "control";
    /** settable */
    subKind: string;
    /** read only, back reference */
    effectElement: { reference: string; };
};
export type public_effectKind = effectKind;
export type public_settable_effectKind = Omit<public_effectKind, "id" | "effectElement">;
export type copyUniqueContext_effectKind = {
    /** read only, back reference */
    effectElement: { reference: string; };
};
export type macroCommand = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    index: number;
    /** read only, back reference */
    macro: { reference: string; };
    /** read only, JSON stringified command */
    command: string;
};
export type public_macroCommand = macroCommand;
export type public_settable_macroCommand = Omit<public_macroCommand, "id" | "macro" | "command">;
export type copyUniqueContext_macroCommand = {
    /** settable */
    index: number;
    /** read only, back reference */
    macro: { reference: string; };
};
export type presetElement = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
    index: number;
    /** settable */
    fixtures: null | { reference: string; }[];
    /** settable */
    group: null | { reference: string; };
    /** settable */
    attributes: attributesType;
    /** read only */
    preset: { reference: string; };
};
export type public_presetElement = presetElement;
export type public_settable_presetElement = Omit<public_presetElement, "id" | "preset">;
export type copyUniqueContext_presetElement = {
    /** settable */
    index: number;
    /** read only */
    preset: { reference: string; };
};
export type executorButton = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, unique */
    index: number;
    /** read only, back reference */
    executor: { reference: string; };
    /** settable, default flashFull */
    function: "flashFull" | "flashZero" | "flashActive" | "go" | "goBack" | "release";
};
export type public_executorButton = executorButton;
export type public_settable_executorButton = Omit<public_executorButton, "id" | "executor">;
export type copyUniqueContext_executorButton = {
    /** settable, unique */
    index: number;
    /** read only, back reference */
    executor: { reference: string; };
};
export type executorFader = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable, default intensity */
    function: "intensity" | "activeCrossfade" | "cueCrossfade";
    /** read only, back reference */
    executor: { reference: string; };
};
export type public_executorFader = executorFader;
export type public_settable_executorFader = Omit<public_executorFader, "id" | "executor">;
export type copyUniqueContext_executorFader = {
    /** read only, back reference */
    executor: { reference: string; };
};
export type programmerElement = {
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
export type public_programmerElement = programmerElement;
export type public_settable_programmerElement = Omit<public_programmerElement, "id" | "selected" | "contents">;
export type copyUniqueContext_programmerElement = {
    /** settable, unique */
    index: number;
};
export type programmerElementContent = {
    /** read only, unique, default cuid() */
    id: string;
    /** settable */
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
export type public_programmerElementContent = programmerElementContent;
export type public_settable_programmerElementContent = Omit<public_programmerElementContent, "id" | "effects" | "preset" | "programmerElement">;
export type copyUniqueContext_programmerElementContent = {
    /** settable */
    index: number;
    /** read only, back reference */
    programmerElement: { reference: string; };
};

export type modelData<T extends modelName> = T extends "executor" ? executor : T extends "actionButton" ? actionButton : T extends "macro" ? macro : T extends "variable" ? variable : T extends "speedGroup" ? speedGroup : T extends "scene" ? scene : T extends "cuelist" ? cuelist : T extends "collection" ? collection : T extends "section" ? section : T extends "fixture" ? fixture : T extends "group" ? group : T extends "preset" ? preset : T extends "effect" ? effect : T extends "show" ? show : T extends "cue" ? cue : T extends "override" ? override : T extends "sectionSceneState" ? sectionSceneState : T extends "sectionCuelistState" ? sectionCuelistState : T extends "groupElement" ? groupElement : T extends "sceneElement" ? sceneElement : T extends "sceneElementContent" ? sceneElementContent : T extends "cueElement" ? cueElement : T extends "cueElementContent" ? cueElementContent : T extends "effectElement" ? effectElement : T extends "effectOffset" ? effectOffset : T extends "effectKind" ? effectKind : T extends "macroCommand" ? macroCommand : T extends "presetElement" ? presetElement : T extends "executorButton" ? executorButton : T extends "executorFader" ? executorFader : T extends "programmerElement" ? programmerElement : T extends "programmerElementContent" ? programmerElementContent : never;
export type publicModelData<T extends modelName> = T extends "executor" ? public_executor : T extends "actionButton" ? public_actionButton : T extends "macro" ? public_macro : T extends "variable" ? public_variable : T extends "speedGroup" ? public_speedGroup : T extends "scene" ? public_scene : T extends "cuelist" ? public_cuelist : T extends "collection" ? public_collection : T extends "section" ? public_section : T extends "fixture" ? public_fixture : T extends "group" ? public_group : T extends "preset" ? public_preset : T extends "effect" ? public_effect : T extends "show" ? public_show : T extends "cue" ? public_cue : T extends "override" ? public_override : T extends "sectionSceneState" ? public_sectionSceneState : T extends "sectionCuelistState" ? public_sectionCuelistState : T extends "groupElement" ? public_groupElement : T extends "sceneElement" ? public_sceneElement : T extends "sceneElementContent" ? public_sceneElementContent : T extends "cueElement" ? public_cueElement : T extends "cueElementContent" ? public_cueElementContent : T extends "effectElement" ? public_effectElement : T extends "effectOffset" ? public_effectOffset : T extends "effectKind" ? public_effectKind : T extends "macroCommand" ? public_macroCommand : T extends "presetElement" ? public_presetElement : T extends "executorButton" ? public_executorButton : T extends "executorFader" ? public_executorFader : T extends "programmerElement" ? public_programmerElement : T extends "programmerElementContent" ? public_programmerElementContent : never;
export type publicSettableModelData<T extends modelName> = T extends "executor" ? public_settable_executor : T extends "actionButton" ? public_settable_actionButton : T extends "macro" ? public_settable_macro : T extends "variable" ? public_settable_variable : T extends "speedGroup" ? public_settable_speedGroup : T extends "scene" ? public_settable_scene : T extends "cuelist" ? public_settable_cuelist : T extends "collection" ? public_settable_collection : T extends "section" ? public_settable_section : T extends "fixture" ? public_settable_fixture : T extends "group" ? public_settable_group : T extends "preset" ? public_settable_preset : T extends "effect" ? public_settable_effect : T extends "show" ? public_settable_show : T extends "cue" ? public_settable_cue : T extends "override" ? public_settable_override : T extends "sectionSceneState" ? public_settable_sectionSceneState : T extends "sectionCuelistState" ? public_settable_sectionCuelistState : T extends "groupElement" ? public_settable_groupElement : T extends "sceneElement" ? public_settable_sceneElement : T extends "sceneElementContent" ? public_settable_sceneElementContent : T extends "cueElement" ? public_settable_cueElement : T extends "cueElementContent" ? public_settable_cueElementContent : T extends "effectElement" ? public_settable_effectElement : T extends "effectOffset" ? public_settable_effectOffset : T extends "effectKind" ? public_settable_effectKind : T extends "macroCommand" ? public_settable_macroCommand : T extends "presetElement" ? public_settable_presetElement : T extends "executorButton" ? public_settable_executorButton : T extends "executorFader" ? public_settable_executorFader : T extends "programmerElement" ? public_settable_programmerElement : T extends "programmerElementContent" ? public_settable_programmerElementContent : never;
export type copyUniqueContext<T extends modelName> = T extends "executor" ? copyUniqueContext_executor : T extends "actionButton" ? copyUniqueContext_actionButton : T extends "macro" ? copyUniqueContext_macro : T extends "variable" ? copyUniqueContext_variable : T extends "speedGroup" ? copyUniqueContext_speedGroup : T extends "scene" ? copyUniqueContext_scene : T extends "cuelist" ? copyUniqueContext_cuelist : T extends "collection" ? copyUniqueContext_collection : T extends "section" ? copyUniqueContext_section : T extends "fixture" ? copyUniqueContext_fixture : T extends "group" ? copyUniqueContext_group : T extends "preset" ? copyUniqueContext_preset : T extends "effect" ? copyUniqueContext_effect : T extends "show" ? copyUniqueContext_show : T extends "cue" ? copyUniqueContext_cue : T extends "override" ? copyUniqueContext_override : T extends "sectionSceneState" ? copyUniqueContext_sectionSceneState : T extends "sectionCuelistState" ? copyUniqueContext_sectionCuelistState : T extends "groupElement" ? copyUniqueContext_groupElement : T extends "sceneElement" ? copyUniqueContext_sceneElement : T extends "sceneElementContent" ? copyUniqueContext_sceneElementContent : T extends "cueElement" ? copyUniqueContext_cueElement : T extends "cueElementContent" ? copyUniqueContext_cueElementContent : T extends "effectElement" ? copyUniqueContext_effectElement : T extends "effectOffset" ? copyUniqueContext_effectOffset : T extends "effectKind" ? copyUniqueContext_effectKind : T extends "macroCommand" ? copyUniqueContext_macroCommand : T extends "presetElement" ? copyUniqueContext_presetElement : T extends "executorButton" ? copyUniqueContext_executorButton : T extends "executorFader" ? copyUniqueContext_executorFader : T extends "programmerElement" ? copyUniqueContext_programmerElement : T extends "programmerElementContent" ? copyUniqueContext_programmerElementContent : never;
export type canInfluenceOutputModelName = "speedGroup" | "scene" | "cuelist" | "fixture" | "group" | "preset" | "effect" | "cue" | "override" | "groupElement" | "sceneElement" | "sceneElementContent" | "cueElement" | "cueElementContent" | "effectElement" | "effectOffset" | "effectKind" | "presetElement" | "programmerElement" | "programmerElementContent";

// </auto generated, do not edit>
