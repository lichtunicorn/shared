import type { generalFunctionNames } from '../database/structure/models/actionButton.ts';
import type { serialPaths } from './index.ts';

export type serialOptions = {
    path: typeof serialPaths[number];
    baudRate: number;
};

export type hardwareState = {
    buttons: hardwareGeneralButtonState[];
    faderSets: hardwareFaderSetState[];
    encoders: hardwareEncoderState[];
};

export type hardwareGeneralButtonState = {
    clicked: boolean;
    function: typeof generalFunctionNames[number];
} | {
    clicked: boolean;
    function: 'custom';
    index: number;
};

export type hardwareFaderSetState = {
    buttons: boolean[];
    /** Number from 0 to 100 */
    fader: number;
};

export type hardwareEncoderState = {
    button: boolean;
    withClock: boolean;
    /** Number from 0 to 100, (100 being full rotation). Relative to previous state */
    relativeRotation: number;
};