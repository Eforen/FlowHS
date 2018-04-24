import { OutputTypes } from './outputTypes';
import { ConnectionState } from './ConnectionState';

export interface InputState {
    name: string,
    value: any,
    acceptsConnectionFrom: OutputTypes[]
    connection: ConnectionState | undefined
}

export const InputStateDefault: InputState = {
    name: 'In',
    value: false,
    acceptsConnectionFrom: [],
    connection: undefined
}