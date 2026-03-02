import type { Server, Socket } from 'socket.io';
import type { z } from 'zod';

import type { modelName, publicModelData, publicSettableModelData } from '../../modules/database/structure/types';
import type { showData, showDataInput } from '../../modules/show/schema';
import type { errorInfo } from '../error/types';
import type { outputOptions } from '../output/types';
import type { publicFixtureType } from '../fixtureTypes/types';
import type { networkInterface } from '../network/types';
import type { noGetCommand as noGetCommandSchema } from '../command/schema';
import type { runCommandSource, runCommandReturn, contextType } from '../command/run/types';
import type { hardwareEncoderState, hardwareFaderSetState, hardwareGeneralButtonState, hardwareState, hardwareOptions } from '../hardware/types';
import type { clientClickButtons, clientHoldButtons } from '../hardware';
import type { programmerState } from '../programmer/types';

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
    fixtureTypes(fixtureTypes: publicFixtureType[]): void;
    networkInterfaces(networkInterfaces: networkInterface[]): void;
    hardwareState(hardwareState: hardwareState | null): void;
    hardwareShowId(showId: string | null): void;
    hardwareClientId(clientId: string | null): void;
    hardwareOptions(options: hardwareOptions): void;
    programmerState(programmerState: programmerState): void;

    hardwareClientButtonClick(button: typeof clientClickButtons[number], uniHeld: boolean): void;
    hardwareClientButtonHold(button: typeof clientHoldButtons[number], clicked: boolean): void;

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

    getFixtureTypes: () => void;
    getNetworkInterfaces: () => void;

    subscribeHardwareState: () => void;
    unsubscribeHardwareState: () => void;
    setWebBoardHardwareState: (hardwareState: hardwareState) => void;
    setWebBoardFaderSetState: (faderSetIndex: number, faderSetState: hardwareFaderSetState) => void;
    setWebBoardEncoderState: (encoderIndex: number, encoderState: hardwareEncoderState) => void;
    setWebBoardButtonState: (buttonIndex: number, buttonState: hardwareGeneralButtonState) => void;

    subscribeHardwareShowId: () => void;
    unsubscribeHardwareShowId: () => void;
    setHardwareShowId: (showId: string | null) => void;

    subscribeHardwareClientId: () => void;
    unsubscribeHardwareClientId: () => void;
    setHardwareClientId: (clientId: string | null) => void;

    subscribeHardwareOptions: () => void;
    unsubscribeHardwareOptions: () => void;
    setHardwareOptions: (options: hardwareOptions) => void;

    subscribeProgrammerState: () => void;
    unsubscribeProgrammerState: () => void;

    update<T extends modelName>(
        model: T,
        id: string,
        data: Partial<publicSettableModelData<T>>
    ): void;

    create<T extends modelName>(
        model: T,
        data: Partial<publicModelData<T>>
    ): void;

    command(
        command: z.infer<typeof noGetCommandSchema>,
        context: contextType,
        run: boolean,
        source: runCommandSource,
        callback: (result: runCommandReturn) => void
    ): void;
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
    hardwareStateSubscribed: boolean;
    hardwareShowIdSubscribed: boolean;
    hardwareClientIdSubscribed: boolean;
    hardwareOptionsSubscribed: boolean;
    programmerStateSubscribed: boolean;

    manySubscribedModels: modelName[];
    specificSubscribedModels: Partial<{
        [currentModelName in modelName]: string[]
    }>;
}

export type ioType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type socketType = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;