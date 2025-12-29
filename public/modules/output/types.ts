export type artnetOptions = {
    host: string;
    port: number;
    /** Number of milliseconds between each refresh (sending full DMX state again) */
    refresh: number;
    /** Always send full DMX universe, instead of only sending changed values */
    sendAll: boolean;
    universes: number;
};

export type outputOptions = {
    artnetOptions: artnetOptions;
    fps: number;
    /** How much to offset the render output */
    renderTimeOffset: number;
};