import { Reducer } from 'redux';
import { EditorState, EditorStateDefault } from '../state/editorState';
import { editorActionTypes } from '../actions/actionTypes';
import { EmulatorState } from '../../emulator/state/emulatorState';
import { MoveType } from '../state/MoveState';
import { EditorNodeState } from '../state/EditorNodeState';
import { IActionNodeCreate } from '../actions/nodeCreate';
import { createBasic } from '../../emulator/Builtin/BasicLogic';

export const NodeReducer: Reducer<EditorState> = (state, action: IActionNodeCreate) => {
    if (state == undefined) state = EditorStateDefault

    switch (action.type) {
        case editorActionTypes.NODE_CREATE:
            return { ...state, 
                nextNodeID: (state.nextNodeID + 1),
                nodes: [...state.nodes.slice(0, state.nextNodeID), { x: action.pos.x, y: action.pos.y}, ...state.nodes.slice(state.nextNodeID + 1)],
                emulator: {
                    ...state.emulator,
                    nodes: [
                        ...state.emulator.nodes.slice(0, state.nextNodeID), 
                        createBasic(action.logic), 
                        ...state.emulator.nodes.slice(state.nextNodeID)
                    ],
                    updated: [
                        ...state.emulator.updated.slice(0, state.nextNodeID),
                        true,
                        ...state.emulator.updated.slice(state.nextNodeID)
                    ]
                }
            }
        default:
            return state
    }
}