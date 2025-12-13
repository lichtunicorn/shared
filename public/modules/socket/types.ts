import type { Server, Socket } from 'socket.io';
import type { modelName, publicModelData } from '../database/structure/types';
import type { showData } from '../show/types';

export interface ServerToClientEvents {
    connect: () => void;
    clientId: (clientId: string) => void;
    showConnected: (showId: string | null) => void;
    showNotFound: () => void;

    manyData<T extends modelName>(model: T, data: publicModelData<T>[]): void;
    specificData<T extends modelName>(model: T, id: string, data: publicModelData<T> | null): void;

    shows(): showData[];
}

export interface ClientToServerEvents {
    connect: () => void;
    connectShow: (showId: string | null) => void;

    subscribeMany: (model: modelName) => void;
    subscribeSpecific: (model: modelName, id: string) => void;
    unsubscribeMany: (model: modelName) => void;
    unsubscribeSpecific: (model: modelName, id: string) => void;

    subscribeShows: () => void;
    unsubscribeShows: () => void;
    createShow: (showData: Omit<showData, 'id'>) => void;
}

export interface InterServerEvents {
    // 
}

export interface SocketData {
    clientId: string;

    showId: string | null;
    showsSubscribed: boolean;

    manySubscribedModels: modelName[];
    specificSubscribedModels: Partial<{
        [currentModelName in modelName]: string[]
    }>;
}

export type ioType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type socketType = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;