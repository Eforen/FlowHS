import { Reducer } from 'redux';
import { EditorState, EditorStateDefault } from '../state/editorState';
import { editorActionTypes } from '../actions/actionTypes';
import { EmulatorState } from '../../emulator/state/emulatorState';
import { MoveType } from '../state/MoveState';
import { EditorNodeState } from '../state/EditorNodeState';
import { IActionDragStart } from '../actions/dragActions';

export const NodeMoveReducer: Reducer<EditorState> = (state, action) => {
    if (state == undefined) state = EditorStateDefault

    switch (action.type) {
        case editorActionTypes.DRAG_NODE_START:
            return { ...state, 
                nodeMoving: {
                    ...state.nodeMoving,
                    dragging: true,
                    type: action.targetType,
                    posStartX: action.start[0],
                    posStartY: action.start[1],
                    posOffsetX: action.offset[0],
                    posOffsetY: action.offset[1],
                    posCurrentX: action.start[0],
                    posCurrentY: action.start[1],
                    nodeID: action.node,
                    output: action.output,
                    input: action.input
                },
                nodes: 
                    (action.type == MoveType.ConnectorInput || action.type == MoveType.ConnectorOutput) ?
                        state.nodes :
                        state.nodeMoving.dragging == true ? state.nodes.map((value, index, arr) => {
                    if (index == state.nodeMoving.nodeID){
                        return {
                            x: state.nodeMoving.posStartX + state.nodeMoving.posOffsetX, 
                            y: state.nodeMoving.posStartY + state.nodeMoving.posOffsetY
                        }
                    }
                    return value
                }) : state.nodes
            }
        case editorActionTypes.DRAG_NODE_MOVE:
            if (state.nodeMoving.dragging == false) return state;
            return {
                ...state,
                nodeMoving: {
                    ...state.nodeMoving,
                    posCurrentX: action.pos[0],
                    posCurrentY: action.pos[1]
                },
                nodes: (state.nodeMoving.input > -1 || state.nodeMoving.output > -1) ?
                        state.nodes :
                        state.nodeMoving.type == MoveType.Node ? 
                        state.nodes.map((value: EditorNodeState, index: number, array: EditorNodeState[]) => {
                    if (index == state.nodeMoving.nodeID){
                        return {
                            x: action.pos[0] + state.nodeMoving.posOffsetX,
                            y: action.pos[1] + state.nodeMoving.posOffsetY
                        } as EditorNodeState
                    }
                    return value
                }) : state.nodes 
            }
        case editorActionTypes.DRAG_NODE_STOP:
            return {
                ...state,
                nodeMoving: {
                    dragging: false,
                    type: MoveType.Node,
                    posStartX: 0,
                    posStartY: 0,
                    posOffsetX: 0,
                    posOffsetY: 0,
                    posCurrentX: 0,
                    posCurrentY: 0,
                    nodeID: -1,
                    output: -1,
                    input: -1
                },
                nodes: state.nodeMoving.type == MoveType.Node ? state.nodes.map((value: EditorNodeState, index: number, array: EditorNodeState[]) => {
                    if (index == state.nodeMoving.nodeID) {
                        if (action.success) {
                            return {
                                x: (action.pos[0] as number) + state.nodeMoving.posOffsetX,
                                y: (action.pos[1] as number) + state.nodeMoving.posOffsetY
                            } as EditorNodeState
                        }
                        return {
                            x: state.nodeMoving.posStartX + state.nodeMoving.posOffsetX,
                            y: state.nodeMoving.posStartY + state.nodeMoving.posOffsetY
                        } as EditorNodeState
                    }
                    return value
                }) : state.nodes
            }
        default:
            return state
    }
}