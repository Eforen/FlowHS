import { OutputTypes } from './outputTypes';

export interface OutputState {
    name: string,
    type: OutputTypes,
    value: any,
    connections: number[]
}