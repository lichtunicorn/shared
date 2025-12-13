import type { Server, Socket } from 'socket.io';
import type { modelName, publicModelData } from '../database/structure/types';
import type { showData, showDataInput } from '../show/schema';
import type { z } from 'zod';

export interface ServerToClientEvents {
    connect: () => void;
    clientId: (clientId: string) => void;
    showJoined: (showId: string | null) => void;
    showNotFound: () => void;

    manyData<T extends modelName>(model: T, data: publicModelData<T>[]): void;
    specificData<T extends modelName>(model: T, id: string, data: publicModelData<T> | null): void;

    shows(shows: z.infer<typeof showData>[]): void;
}

export interface ClientToServerEvents {
    connect: () => void;
    joinShow: (showId: string | null) => void;

    subscribeMany: (model: modelName) => void;
    subscribeSpecific: (model: modelName, id: string) => void;
    unsubscribeMany: (model: modelName) => void;
    unsubscribeSpecific: (model: modelName, id: string) => void;

    subscribeShows: () => void;
    unsubscribeShows: () => void;
    createShow: (showData: z.infer<typeof showDataInput>) => void;
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