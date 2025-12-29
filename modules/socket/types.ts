import type { Server, Socket } from 'socket.io';
import type { modelName, publicModelData } from '../../modules/database/structure/types';
import type { showData, showDataInput } from '../../modules/show/schema';
import type { z } from 'zod';
import type { errorInfo } from '../error/types';
import type { outputOptions } from '../output/types';

export interface ServerToClientEvents {
    connect: () => void;
    clientId: (clientId: string) => void;
    showJoined: (showId: string | null) => void;
    showNotFound: () => void;

    manyData<T extends modelName>(model: T, data: publicModelData<T>[]): void;
    specificData<T extends modelName>(model: T, id: string, data: publicModelData<T> | null): void;

    shows(shows: z.infer<typeof showData>[]): void;
    errors(errors: errorInfo[]): void;
    outputShowId(showId: string | null): void;
    outputOptions(options: outputOptions): void;

    debugSocketUrl: (url: string) => void;
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

    subscribeErrors: () => void;
    unsubscribeErrors: () => void;

    subscribeOutputShowId: () => void;
    unsubscribeOutputShowId: () => void;
    setOutputShowId: (showId: string | null) => void;

    subscribeOutputOptions: () => void;
    unsubscribeOutputOptions: () => void;
    setOutputOptions: (options: outputOptions) => void;
}

export interface InterServerEvents {
    // 
}

export interface SocketData {
    clientId: string;

    showId: string | null;
    showsSubscribed: boolean;
    errorsSubscribed: boolean;
    outputShowIdSubscribed: boolean;
    outputOptionsSubscribed: boolean;

    manySubscribedModels: modelName[];
    specificSubscribedModels: Partial<{
        [currentModelName in modelName]: string[]
    }>;
}

export type ioType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type socketType = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;