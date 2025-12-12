import type { Server, Socket } from 'socket.io';
import type { modelName, publicModelData } from '../database/structure/types';

export interface ServerToClientEvents {
    connect: () => void;
    connectReceived: () => void;

    manyData<T extends modelName>(model: T, data: publicModelData<T>[]): void;
    specificData<T extends modelName>(model: T, id: string, data: publicModelData<T> | null): void;
}

export interface ClientToServerEvents {
    connect: () => void;
    subscribeMany: (model: modelName) => void;
    subscribeSpecific: (model: modelName, id: string) => void;
    unsubscribeMany: (model: modelName) => void;
    unsubscribeSpecific: (model: modelName, id: string) => void;
}

export interface InterServerEvents {
    // 
}

export interface SocketData {
    // 
}

export type ioType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type socketType = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;