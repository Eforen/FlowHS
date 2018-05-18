import { Reducer } from 'redux';
import { EditorState, EditorStateDefault } from '../state/editorState';
import { editorActionTypes } from '../actions/actionTypes';
import { IActionHoverStart, IActionHoverEnd } from '../actions/hoverActions';

export const HoverReducer: Reducer<EditorState> = (state, action: IActionHoverStart | IActionHoverEnd) => {
    if (state == undefined) state = EditorStateDefault

    switch (action.type) {
        case editorActionTypes.HOVER_ENTER:
            state = {
                ...state,
                hover: {
                    ...state.hover,
                    hovering: [...state.hover.hovering, {node: action.node, input: action.input, connector: action.connector}]
                }
            }
            break;
        case editorActionTypes.HOVER_LEAVE:
            state = {
                ...state,
                hover: {
                    ...state.hover,
                    hovering: state.hover.hovering.filter((e: {node: number, input: boolean, connector: number}) => 
                        (e.node == action.node && e.input == e.input && e.connector == e.connector) == false
                    )
                }
            }
            break;
    }
    return state
}