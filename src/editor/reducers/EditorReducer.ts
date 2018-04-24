import { Reducer } from 'redux';
import { EditorState, EditorStateDefault } from '../state/editorState';
import { editorActionTypes } from '../actions/actionTypes';
import { EmulatorState } from '../../emulator/state/emulatorState';
import { MoveType } from '../state/MoveState';
import { NodeMoveReducer } from './NodeMoveReducer';

export const EditorReducer: Reducer<EditorState> = (state: EditorState = EditorStateDefault, action: any) => {
    switch (action.type) {
        case editorActionTypes.DRAG_NODE_START:
        case editorActionTypes.DRAG_NODE_MOVE:
        case editorActionTypes.DRAG_NODE_STOP:
            return NodeMoveReducer(state as EditorState, action);
            

        case editorActionTypes.UPDATESTATE:
            break;

        default:
            break;
    }
    return state
}