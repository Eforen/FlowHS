import { IAction, editorActionTypes } from './actionTypes';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { MoveType } from '../state/MoveState';
import Connector from '../../emulator/Connector';

export interface IActionHoverStart extends IAction {
    type: editorActionTypes
    node: number
    input: boolean
    connector: number
}

export const makeActionHoverStart: (target: number, input: boolean, connector: number) => IActionHoverStart = (target: number, input: boolean, connector: number) => {
    return {
        type: editorActionTypes.HOVER_ENTER,
        node: target,
        input: input,
        connector: connector
    }
}

export interface IActionHoverEnd extends IAction {
    type: editorActionTypes
    node: number
    input: boolean
    connector: number
}

export const makeActionHoverEnd: (target: number, input: boolean, connector: number) => IActionHoverEnd = (target: number, input: boolean, connector: number) => {
    return {
        type: editorActionTypes.HOVER_LEAVE,
        node: target,
        input: input,
        connector: connector
    }
}