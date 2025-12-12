import type { Server, Socket } from 'socket.io';

export interface ServerToClientEvents {
    connect: () => void;
    manyData: (data: any) => void;
}

export interface ClientToServerEvents {
    connect: () => void;
    subscribeMany: (model: string) => void;
    subscribeSpecific: (model: string, id: string) => void;
    unsubscribeMany: (model: string) => void;
    unsubscribeSpecific: (model: string, id: string) => void;
}

export interface InterServerEvents {
    // 
}

export interface SocketData {
    // 
}

export type ioType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type socketType = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;