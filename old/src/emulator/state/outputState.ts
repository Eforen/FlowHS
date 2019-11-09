import { OutputTypes } from './outputTypes';
import { IConnectionState } from './ConnectionState';

export interface OutputState {
    name: string,
    type: OutputTypes,
    value: any,
    connections: IConnectionState[]
}

export const OutputStateDefault: OutputState = {
    name: 'Out',
    type: OutputTypes.BIT,
    value: false,
    connections: []
}