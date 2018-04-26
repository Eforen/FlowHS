import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { MoveState, MoveStateDefault } from './MoveState';
import { EditorNodeState } from './EditorNodeState';

export interface EditorState {
    nodeMoving: MoveState
    nextNodeID: number
    nodes: EditorNodeState[]
    emulator: EmulatorState
}

export const EditorStateDefault: EditorState = {
    nodeMoving: MoveStateDefault,
    nextNodeID: 0,
    nodes: [],
    emulator: EmulatorStateDefault
}