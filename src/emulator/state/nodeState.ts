import { InputState } from './inputState';
import { OutputState } from './outputState';
import { NodeTypes } from './nodeTypes';

export interface NodeState {
    ID: number,
    name: string,
    userName: string,
    type: NodeTypes,
    changed: boolean,
    inputs: InputState[]
    outputs: OutputState[]
}

export const NodeStateDefault: NodeState = {
    ID: -1,
    name: 'Error',
    userName: 'Error',
    type: NodeTypes.BIT_AND,
    changed: false,
    inputs: [],
    outputs: []
}