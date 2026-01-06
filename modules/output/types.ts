export type artnetOptions = {
    host: string;
    port: number;
    /** Number of milliseconds between each refresh (sending full DMX state again) */
    refresh: number;
    /** Always send full DMX universe, instead of only sending changed values */
    sendAll: boolean;
    /** Ip address of network interface to bind to */
    bind: string | null;
};

export type outputOptions = {
    artnetOptions: artnetOptions;
    fps: number;
    /** How much to offset the render output */
    renderTimeOffset: number;
};