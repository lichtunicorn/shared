export type structure = Record<string, model>;

export type model = {
    deletable?: boolean;
    goable?: boolean;
    canAssign?: boolean; // if this is a thing that can be assigned to something else
    isAssignable?: boolean; // if something else can assign to this
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