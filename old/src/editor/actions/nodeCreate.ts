import { IAction, editorActionTypes } from './actionTypes';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { emulatorActionTypes } from '../../emulator/actions/actionTypes';

export interface IActionNodeCreate extends IAction {
    type: editorActionTypes
    logic: LogicTypes
    pos: { x: number, y: number}
}

export const nodeCreate: (type: LogicTypes, x: number, y: number) => IActionNodeCreate = (type: LogicTypes, x: number, y: number) => {
    return {
        type: editorActionTypes.NODE_CREATE,
        logic: type,
        pos: { x: x, y: y }
    }
}