import { OutputTypes } from './outputTypes';
import { IConnectionState } from './ConnectionState';

export interface InputState {
    name: string,
    value: any,
    acceptsConnectionFrom: OutputTypes[]
    connection: IConnectionState | undefined
}

export const InputStateDefault: InputState = {
    name: 'In',
    value: false,
    acceptsConnectionFrom: [],
    connection: undefined
}