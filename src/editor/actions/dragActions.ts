import { IAction, editorActionTypes } from './actionTypes';
import { LogicTypes } from '../../emulator/state/nodeTypes';
import { MoveType } from '../state/MoveState';
import Connector from '../../emulator/Connector';

export interface IActionDragStart extends IAction {
    type: editorActionTypes
    node: number
    start: [ number, number ]
    offset: [ number, number ]
    targetType: MoveType,
    input: number,
    output: number
}

export const makeActionDragNodeStart: (
        node: number, 
        start: [number, number],
        offset: [number, number]
    ) => IActionDragStart = (
        node: number,
        start: [number, number],
        offset: [number, number]
    ) => {
    return {
        type: editorActionTypes.DRAG_NODE_START,
        node: node,
        start: start,
        offset: offset,
        targetType: MoveType.Node,
        input: -1,
        output: -1
    }
}

export const makeActionDragConnectorStart: (
        node: number, 
        start: [number, number],
        offset: [number, number],
        input: boolean,
        connectorNumber: number
    ) => IActionDragStart = (
        node: number,
        start: [number, number],
        offset: [number, number],
        input: boolean,
        connectorNumber: number
    ) => {
        //console.log('WTF! connectorNumber:' + connectorNumber)
    return {
        type: editorActionTypes.DRAG_NODE_START,
        node: node,
        start: start,
        offset: offset,
        targetType: input ? MoveType.ConnectorInput : MoveType.ConnectorOutput,
        input: (input ? connectorNumber : -1),
        output: (input == false ? connectorNumber : -1)
    }
}

export interface IActionDragMove extends IAction {
    type: editorActionTypes
    pos: [number, number]
}

export const makeActionDragMove: (
    x: number, 
    y: number
) => IActionDragMove = (
    x: number,
    y: number
) => {
    return {
        type: editorActionTypes.DRAG_NODE_MOVE,
        pos: [x, y]
    }
}



export interface IActionDragStop extends IAction {
    type: editorActionTypes
    pos: [number, number]
    success: boolean
}

export const makeActionDragStop: (
    x: number,
    y: number,
    success: boolean
) => IActionDragStop = (
    x: number,
    y: number,
    success: boolean
) => {
    return {
        type: editorActionTypes.DRAG_NODE_STOP,
        pos: [x, y],
        success: success
    }
}