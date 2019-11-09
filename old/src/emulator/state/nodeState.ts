import { InputState } from './inputState';
import { OutputState } from './outputState';
import { LogicTypes } from './nodeTypes';

export interface NodeState {
    ID: number,
    name: string,
    userName: string,
    type: LogicTypes,
    changed: boolean,
    inputs: InputState[]
    outputs: OutputState[]
}

export const NodeStateDefault: NodeState = {
    ID: -1,
    name: 'Error',
    userName: 'Error',
    type: LogicTypes.BIT_AND,
    changed: false,
    inputs: [],
    outputs: []
}