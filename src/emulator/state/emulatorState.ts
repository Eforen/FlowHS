import { NodeState } from './nodeState';

export interface EmulatorState {
    step: number,
    sleepTime: number,
    changed: boolean,
    nodes: NodeState[],
    updated: boolean[]
    messages: string[]
}