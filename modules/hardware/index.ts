export const serialPaths = ['COM1', 'COM2', 'COM3', 'COM4'] as const;

export type serialOptions = {
    path: typeof serialPaths[number];
    baudRate: number;
};