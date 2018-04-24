import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { MoveState, MoveStateDefault } from './MoveState';
import { EditorNodeState } from './EditorNodeState';

export interface EditorState {
    nodeMoving: MoveState
    nodes: EditorNodeState[]
    emulator: EmulatorState
}

export const EditorStateDefault: EditorState = {
    nodeMoving: MoveStateDefault,
    nodes: [],
    emulator: EmulatorStateDefault
}