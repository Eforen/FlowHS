import { OutputTypes } from './outputTypes';

export interface InputState {
    name: string,
    value: any,
    acceptsConnectionFrom: OutputTypes[]
}