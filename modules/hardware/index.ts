import type { generalFunctionNames } from "../database/structure/models/actionButton";

export const serialPaths = ['COM1', 'COM2', 'COM3', 'COM4'] as const;

export const serverClickButtons = [
    'clear',
    'blind',
    'highlight',
    'previous',
    'all',
    'next',
    'nextPage',
    'previousPage',
    'nextSection',
] as const satisfies typeof generalFunctionNames[number][];

export const clientClickButtons = [
    'kindIntensity',
    'kindPosition',
    'kindColor',
    'kindBeam',

    'group',
    'scene',
    'cuelist',

    'empty',
    'copy',
    'move',
    'delete',

    'select',
    'record',
    'setAttribute',

    'go',
    'release',
    'assign',
    'open',

    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'arrowDown',

    'number0',
    'number1',
    'number2',
    'number3',
    'number4',
    'number5',
    'number6',
    'number7',
    'number8',
    'number9',
    'dot',
    'at',
    'thru',
    'plus',
    'enter',
    'backspace',
    'set',
] as const satisfies typeof generalFunctionNames[number][];

export const clientHoldButtons = [
    'section-1',
    'section-2',
    'section-3',
    'section-4',
    'section-5',
] as const satisfies typeof generalFunctionNames[number][];