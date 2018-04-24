import { NodeState } from './nodeState';

export interface EmulatorState {
    step: number,
    sleepTime: number,
    changed: boolean,
    nodes: NodeState[],
    updated: boolean[]
    messages: string[]
}

export const EmulatorStateDefault: EmulatorState = {
    step: 0,
    sleepTime: 0,
    changed: false,
    nodes: [],
    updated: [],
    messages: []
}