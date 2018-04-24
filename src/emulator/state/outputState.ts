import { OutputTypes } from './outputTypes';
import { ConnectionState } from './ConnectionState';

export interface OutputState {
    name: string,
    type: OutputTypes,
    value: any,
    connections: ConnectionState[]
}

export const OutputStateDefault: OutputState = {
    name: 'Out',
    type: OutputTypes.BIT,
    value: false,
    connections: []
}