import { EmulatorState, EmulatorStateDefault } from '../../emulator/state/emulatorState';
import { MoveState, MoveStateDefault } from './MoveState';
import { EditorNodeState } from './EditorNodeState';
import { HoverState, HoverStateDefault } from './HoverState';

export interface EditorState {
    nodeMoving: MoveState
    nextNodeID: number
    nodes: EditorNodeState[]
    emulator: EmulatorState
    hover: HoverState
}

export const EditorStateDefault: EditorState = {
    nodeMoving: MoveStateDefault,
    nextNodeID: 0,
    nodes: [],
    emulator: EmulatorStateDefault,
    hover: HoverStateDefault
}